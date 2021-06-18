import { useEffect, useState } from 'react';

const useTime = timeZone => {
  const [time, setTime] = useState('');

  useEffect(() => {
    let interval = setInterval(() => {
      getTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getTime() {
    let t = new Date().toLocaleTimeString([], {
      timeZone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    setTime(t);
  }

  return time;
};

export default useTime;
