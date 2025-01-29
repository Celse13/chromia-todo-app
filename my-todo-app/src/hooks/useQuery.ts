import { useEffect, useState, useCallback } from "react";
import { RawGtv, DictPair } from "postchain-client";
import { useSessionContext } from "../components/ContextProvider";

export function useQuery<
  TReturn extends RawGtv,
  TArgs extends DictPair | undefined = DictPair
>(name: string, args?: TArgs) {
  const session = useSessionContext();
  const [serializedArgs, setSerializedArgs] = useState(JSON.stringify(args));
  const [data, setData] = useState<TReturn | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reload = useCallback(() => {
    setReloadTrigger(prev => prev + 1);
  }, []);

  const sendQuery = async () => {
    if (!session || !args) {
      console.log('Query not sent:', {
        reason: !session ? 'No session' : 'No args',
        queryName: name,
        args
      });
      return;
    }
    
    try {
      console.log('Sending query:', {
        name,
        args,
        argsType: typeof args.account_id,
        timestamp: new Date().toISOString()
      });
      
      setIsLoading(true);
      const data = await session.query<TReturn>({
        name,
        args: {
          ...args,
          // Ensure account_id is properly formatted if it exists
          account_id: args.account_id instanceof Buffer 
            ? args.account_id
            : typeof args.account_id === 'string'
            ? Buffer.from(args.account_id.replace(/^0x/, ''), 'hex')
            : args.account_id
        }
      });
      
      console.log('Query response received:', {
        name,
        data,
        timestamp: new Date().toISOString()
      });
      
      setData(data);
    } catch (error: any) {
      console.error('Query error:', {
        name,
        args,
        error: error?.message || error
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendQuery();
  }, [session, name, serializedArgs, reloadTrigger]);

  return {
    result: data,
    isLoading,
    reload,
  };
}
