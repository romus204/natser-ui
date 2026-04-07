import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'connected' | 'disconnected' | 'error';

export type Message = {
  time: string;
  data: string;
  headers: HeadersInit | null;
};

type WebSocketResponse = {
  data?: string;
  headers: Headers | null;
};

export const useWebs = (url: string) => {
  const [status, setStatus] = useState<Status>('disconnected');
  const [messages, setMessages] = useState<Message[]>([]);

  const websocketRef = useRef<WebSocket | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const msg: WebSocketResponse = JSON.parse(event.data);
      const message: Message = {
        time: new Date().toLocaleTimeString(),
        data: msg.data || String(msg),
        headers: msg.headers || null,
      };
      setMessages((prevState) => [message, ...prevState]);
    } catch {
      const message: Message = {
        time: new Date().toLocaleTimeString(),
        data: event.data,
        headers: null,
      };
      setMessages((prevState) => [message, ...prevState]);
    }
  }, []);

  const connect = useCallback(() => {
    if (!url) return;

    if (websocketRef.current) {
      websocketRef.current.close();
    }

    const socket = new WebSocket(url);

    socket.onmessage = handleMessage;
    socket.onopen = () => {
      setStatus('connected');
    };
    socket.onclose = () => {
      setStatus('disconnected');
    };
    socket.onerror = () => {
      setStatus('error');
    };

    websocketRef.current = socket;
    setMessages([]);
  }, [handleMessage, url]);

  const disconnect = () => {
    websocketRef.current?.close();
    websocketRef.current = null;
    setStatus('disconnected');
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [url]);

  return {
    connect,
    disconnect,
    status,
    messages,
  };
};
