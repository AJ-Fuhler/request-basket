import express from "express";
import cors from "cors";
import { Router } from "express";
import { registerHttpRoutes } from './routes/httpRoutes';
import expressWs from 'express-ws';
import { registerWsRoutes } from "./routes/wsRoutes";

const app = express();
const PORT = 3000;
const { applyTo } = expressWs(app);

app.use(express.json());
app.use(cors());

const wsRouter = Router();
applyTo(wsRouter);
registerWsRoutes(wsRouter);
app.use("/", wsRouter);

const httpRouter = Router();
registerHttpRoutes(httpRouter);
app.use("/", httpRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
