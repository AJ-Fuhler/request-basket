const clients = new Map();
export const sseManager = {
    addClient(endpoint, res) {
        if (!clients.has(endpoint)) {
            clients.set(endpoint, new Set());
        }
        clients.get(endpoint).add(res);
    },
    removeClient(endpoint, res) {
        clients.get(endpoint)?.delete(res);
        if (clients.get(endpoint)?.size === 0) {
            clients.delete(endpoint);
        }
    },
    broadcast(endpoint, data) {
        const endpointClients = clients.get(endpoint);
        if (!endpointClients)
            return;
        const payload = `data: ${JSON.stringify(data)}\n\n`;
        endpointClients.forEach(res => res.write(payload));
    },
};
//# sourceMappingURL=sseManager.js.map