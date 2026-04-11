import express      from "express";
import cors         from "cors";
import bookRoutes   from "./infrastructure/routes/bookRoutes.js";
import { bookController } from "./infrastructure/config/container.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", bookRoutes(bookController));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

export default app;
