import { useEffect, useRef, useState } from "react";
import type { Request } from '../types/Request.ts';

export function useSSE(url: string) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const [newRequest, setNewRequest] = useState<Request | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onopen = () => {
      console.log("SSE connected");
      setConnected(true);
    };

    eventSourceRef.current.onmessage = (event) => {
      try {
        let newRequest = JSON.parse(event.data);
        setNewRequest(newRequest);
      } catch (e) {
        console.error("Failed to parse SSE message", e);
      }
    };

    eventSourceRef.current.onerror = (err) => {
      console.error("SSE error", err);
      setConnected(false);
    };

    return () => {
      eventSourceRef.current?.close();
    };
  }, [url]);

  return { newRequest, connected };
}
