import { useEffect, useRef, useState } from "react";
import type { Request } from '../types/Request.ts';

export function useSSE(url: string) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const [newRequest, setNewRequest] = useState<Request | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log(`[SSE] Connecting to: ${url}`);
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onopen = () => {
      console.log(`[SSE] Connected to: ${url}`);
      setConnected(true);
    };

    eventSourceRef.current.onmessage = (event) => {
      console.log(`[SSE] Message received:`, event.data);
      try {
        let newRequest = JSON.parse(event.data);
        setNewRequest(newRequest);
      } catch (e) {
        console.error("[SSE] Failed to parse message", e);
      }
    };

    eventSourceRef.current.onerror = (err) => {
      console.error(`[SSE] Error (readyState=${eventSourceRef.current?.readyState}):`, err);
      setConnected(false);
    };

    return () => {
      console.log(`[SSE] Closing connection to: ${url}`);
      eventSourceRef.current?.close();
    };
  }, [url]);

  return { newRequest, connected };
}
