import { useState, useEffect } from 'react';

export function useHealthViewModel() {
  const [status, setStatus] = useState<'UP' | 'DOWN' | 'LOADING'>('LOADING');

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

    const checkHealth = async () => {
      try {
        const res = await fetch(`${backendUrl}/actuator/health`, { timeout: 3000 } as any);
        if (res.ok) setStatus('UP');
        else setStatus('DOWN');
      } catch (error) {
        setStatus('DOWN');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return { status };
}