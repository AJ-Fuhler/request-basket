import "./env";
import express from "express";
import cors from "cors";
import { Router } from "express";
import { registerHttpRoutes } from './routes/httpRoutes';
import { connectDBs } from "./models/dbConnection";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const httpRouter = Router();
registerHttpRoutes(httpRouter);
app.use("/", httpRouter);

async function main() {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });

  connectDBs();

  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => process.exit(0));
    });
  });
}

main();

export default app;
