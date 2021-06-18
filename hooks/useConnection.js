import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useConnection = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [connectionType, setConnectionType] = useState(null);
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(status => {
      setIsConnected(status.isConnected);
      setConnectionType(status.type);
    });

    return () => unsubscribe();
  }, []);
  return [isConnected, connectionType];
};

export default useConnection;
