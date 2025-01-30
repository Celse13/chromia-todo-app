'use client'

import Link from "next/link"
import { Button } from "./ui/button"
import { CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSessionContext } from "./ContextProvider"
import { createClient } from "postchain-client"
import { createKeyStoreInteractor, createSingleSigAuthDescriptorRegistration, createWeb3ProviderEvmKeyStore, hours, registerAccount, registrationStrategy, ttlLoginRule } from "@chromia/ft4"
import { getRandomUserName } from "@/lib/user"

export function Nav() {
  const [isConnecting, setIsConnecting] = useState(false);
  const session = useSessionContext();
  const router = useRouter();

  // Add effect to handle redirection when session changes
  useEffect(() => {
    if (session) {
      router.push('/todo');
    }
  }, [session, router]);

  const handleGetStarted = async () => {
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

      const evmKeyStore = await createWeb3ProviderEvmKeyStore(window.ethereum);

      const evmKeyStoreInteractor = createKeyStoreInteractor(client, evmKeyStore);
      const accounts = await evmKeyStoreInteractor.getAccounts();

      try {
        if (accounts.length > 0) {
          // 4. Start a new session
          await evmKeyStoreInteractor.login({
            accountId: accounts[0].id,
            config: {
              rules: ttlLoginRule(hours(2)),
              flags: ["S"]
            }
          });
        } else {
          const authDescriptor = createSingleSigAuthDescriptorRegistration(["A", "T"], evmKeyStore.id);
          await registerAccount(client, evmKeyStore, registrationStrategy.open(authDescriptor, {
            config: {
              rules: ttlLoginRule(hours(2)),
              flags: ["S"]
            }
          }), {
            name: "register_user", args: [getRandomUserName()]
          });
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        alert("Failed to authenticate with MetaMask. Please try again.");
      }

    } catch (error) {
      console.error("Failed to connect:", error);
      alert("Failed to connect to MetaMask. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <header className="flex items-center sticky top-0 z-40 md:rounded-b-lg border justify-between 2xl:w-xl xl:w-lg md:w-[90%] w-full mx-auto h-16 md:px-8 px-5 md:py-3 bg-light">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2 ml-8">
          <CheckCircle className="h-6 w-6 text-orange-500" />
          <span className="font-bold">Todo</span>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <Link href="#features" className="text-sm font-medium hover:text-orange-500">
            Features
          </Link>
          <Button 
            size="sm" 
            onClick={handleGetStarted}
            disabled={isConnecting || !!session}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {session ? 'Connected' : (isConnecting ? 'Connecting...' : 'Get Started')}
          </Button>
        </nav>
      </div>
    </header>
  )
}