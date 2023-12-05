import { useState, useEffect, useRef } from 'react';

// ----------------------------------------------------------------------

export default function useSecondCountdown({
  init = 60,
  automatic = true,
}: {
  init: number;
  automatic?: boolean;
}) {
  const [countdown, setCountdown] = useState<number>(init);
  const [autoStart, setAutoStart] = useState<boolean>(automatic);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (autoStart) {
      intervalRef.current = setInterval(() => {
        if (countdown === 0) {
          clearInterval(intervalRef.current || undefined);
        } else {
          setCountdown((prevCount) => prevCount - 1);
        }
      }, 1000);
      return () => clearInterval(intervalRef.current || undefined);
    }
    return () => clearInterval(intervalRef.current || undefined);
  }, [countdown, autoStart]);

  function start() {
    setAutoStart(true);
    setCountdown(init);
  }

  function restart(coolDown?: number) {
    setAutoStart(true);
    setCountdown(coolDown || init);
  }

  return { countdown, restart, start };
}
