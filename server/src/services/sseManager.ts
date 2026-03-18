import type { Response } from "express";

const clients = new Map<string, Set<Response>>();

export const sseManager = {
  addClient(endpoint: string, res: Response) {
    if (!clients.has(endpoint)) {
      clients.set(endpoint, new Set());
    }
    clients.get(endpoint)!.add(res);
  },

  removeClient(endpoint: string, res: Response) {
    clients.get(endpoint)?.delete(res);
    if (clients.get(endpoint)?.size === 0) {
      clients.delete(endpoint);
    }
  },

  broadcast(endpoint: string, data: unknown) {
    const endpointClients = clients.get(endpoint);
    if (!endpointClients) return;
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    endpointClients.forEach(res => res.write(payload));
  },
};
