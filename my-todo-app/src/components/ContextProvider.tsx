"use client";

import { Session, createKeyStoreInteractor, createSessionStorageLoginKeyStore, createSingleSigAuthDescriptorRegistration, createWeb3ProviderEvmKeyStore, hours, registerAccount, registrationStrategy, ttlLoginRule } from "@chromia/ft4";
import { createClient } from "postchain-client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getRandomUserName } from "@/lib/user";

const ChromiaContext = createContext<Session | undefined>(undefined);

declare global {
    interface Window { ethereum: any }
}

export function ContextProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | undefined>(undefined);

    useEffect(() => {
        const initSession = async () => {
            console.log("Initializing Session");
            // 1. Initialize Client
            const client = await createClient(
                process.env.NEXT_PUBLIC_DEV == "true" ? ({
                    nodeUrlPool: "http://localhost:7740",
                    // blockchainRid: "E542F2FCA93E5B28DAEE9B300D49DFC15F68563479B5894F2FAC6935FF2F4295",
                    blockchainIid: 0
                }) : ({
                    directoryNodeUrlPool: "https://testnet4-dapps.chromia.dev:7740",
                    blockchainRid: "05893974893F4B030AF63DDF7F72564097903012802AB0B3DA6C126751DB90C4"
                }));

            // 2. Connect with metamask
            const evmKeyStore = await createWeb3ProviderEvmKeyStore(window.ethereum);

            // 3. Get all accounts associated with evm address
            const evmKeyStoreInteractor = createKeyStoreInteractor(client, evmKeyStore);
            const accounts = await evmKeyStoreInteractor.getAccounts();

            if (accounts.length > 0) {
            // 4. Start a new session
                const { session } = await evmKeyStoreInteractor.login({
                    accountId: accounts[0].id,
                    config: {
                        rules: ttlLoginRule(hours(2)),
                        flags: ["S"]
                    },
                    loginKeyStore: createSessionStorageLoginKeyStore(),
                })
                setSession(session)
            } else {
                // 5. Create a new account by signing a message using metamask
                const authDescriptor = createSingleSigAuthDescriptorRegistration(["A", "T"], evmKeyStore.id);
                const { session } = await registerAccount(client, evmKeyStore, registrationStrategy.open(authDescriptor, {
                    config: {
                        rules: ttlLoginRule(hours(2)),
                        flags: ["S"]
                    }
                }), {
                    name: "register_user", args: [getRandomUserName()]
                });
                setSession(session)
            }
            console.log("Session initialized");
        };

        initSession().catch(console.error);
    }, []);

    return (
        <ChromiaContext.Provider value={session}>
            {children}
        </ChromiaContext.Provider>
    );
}

export function useSessionContext() {
    return useContext(ChromiaContext)
}
