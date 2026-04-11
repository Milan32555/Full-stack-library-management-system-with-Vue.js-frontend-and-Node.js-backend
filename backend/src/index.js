import express      from "express";
import cors         from "cors";
import bookRoutes   from "./infrastructure/routes/bookRoutes.js";
import { bookController } from "./infrastructure/config/container.js";

const app = express();

// Fix: CORS restringido a los orígenes definidos en ALLOWED_ORIGINS
// En .env: ALLOWED_ORIGINS=https://tu-frontend.netlify.app
// Para desarrollo local también puedes agregar: ALLOWED_ORIGINS=https://tu-frontend.netlify.app,http://localhost:5173
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origin (ej: curl, Postman, mismo servidor)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origen no permitido → ${origin}`));
  },
}));

app.use(express.json());

app.use("/api", bookRoutes(bookController));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

export default app;