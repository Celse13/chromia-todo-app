"use client"

import { useState } from "react";
import Image from "next/image";
import icon from "../../public/icon.svg";
import { useSessionContext } from "./ContextProvider";
import { useRouter } from "next/navigation";
import { createClient } from "postchain-client";
import { createKeyStoreInteractor, createSingleSigAuthDescriptorRegistration, createWeb3ProviderEvmKeyStore, hours, registerAccount, registrationStrategy, ttlLoginRule } from "@chromia/ft4";
import { getRandomUserName } from "@/lib/user";

export const MetaMaskButton = () => {
    const [isConnecting, setIsConnecting] = useState(false);
    const session = useSessionContext();
    const router = useRouter();

    const connectMetaMask = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }
        
        setIsConnecting(true);
        try {
            // 1. Initialize Client
            const client = await createClient(
                process.env.NEXT_PUBLIC_DEV == "true" ? ({
                    nodeUrlPool: "http://localhost:7740",
                    blockchainIid: 0
                }) : ({
                    directoryNodeUrlPool: "https://testnet4-dapps.chromia.dev:7740",
                    blockchainRid: "05893974893F4B030AF63DDF7F72564097903012802AB0B3DA6C126751DB90C4"
                })
            );

            // 2. Connect with metamask
            const evmKeyStore = await createWeb3ProviderEvmKeyStore(window.ethereum);

            // 3. Get all accounts associated with evm address
            const evmKeyStoreInteractor = createKeyStoreInteractor(client, evmKeyStore);
            const accounts = await evmKeyStoreInteractor.getAccounts();

            let newSession;
            if (accounts.length > 0) {
                // 4. Start a new session
                const { session: loginSession } = await evmKeyStoreInteractor.login({
                    accountId: accounts[0].id,
                    config: {
                        rules: ttlLoginRule(hours(2)),
                        flags: ["S"]
                    }
                });
                newSession = loginSession;
            } else {
                // 5. Create a new account
                const authDescriptor = createSingleSigAuthDescriptorRegistration(["A", "T"], evmKeyStore.id);
                const { session: registerSession } = await registerAccount(client, evmKeyStore, registrationStrategy.open(authDescriptor, {
                    config: {
                        rules: ttlLoginRule(hours(2)),
                        flags: ["S"]
                    }
                }), {
                    name: "register_user", args: [getRandomUserName()]
                });
                newSession = registerSession;
            }

            // Wait for session to be set
            if (newSession) {
                // 6. Redirect to todo page after successful connection
                router.push('/todo');
            }

        } catch (error) {
            console.error("Failed to connect:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <button
            onClick={connectMetaMask}
            disabled={isConnecting || !!session}
            className="flex items-center justify-between w-full px-4 py-3 text-left 
                      bg-white hover:bg-gray-50 border rounded-lg transition-colors
                      disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minWidth: '80%' }}
        >
            <span>{session ? 'Connected' : (isConnecting ? 'Connecting...' : 'MetaMask')}</span>
            <Image src={icon} alt="MetaMask" width={24} height={24} />
        </button>
    );
};