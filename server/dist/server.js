import "./models/env.js";
import express from "express";
import cors from "cors";
import { Router } from "express";
import { registerHttpRoutes } from './routes/httpRoutes.js';
import { connectDBs } from "./models/dbConnection.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
// Debug: log every incoming request before routing
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} | Accept: ${req.headers.accept ?? '(none)'}`);
    next();
});
const httpRouter = Router();
registerHttpRoutes(httpRouter);
app.use("/api/", httpRouter);
async function main() {
    const server = app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
    await connectDBs();
    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => {
            server.close(() => process.exit(0));
        });
    });
}
main();
export default app;
//# sourceMappingURL=server.js.map