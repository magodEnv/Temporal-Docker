import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

//init
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
//const PORT = 3001;

// Import routes
import personasRoutes from "./routes/personas.routes.js";
import proyectosRoutes from "./routes/proyectos.routes.js";
import publicacionesRoutes from "./routes/publicaciones.routes.js";
import imagenesRoutes from "./routes/imagen.routes.js";
import mainProyetos from "./routes/mainProyectos.routes.js";
import landingInfo from "./routes/landingInfo.routes.js";
import twitter from "./routes/twitter.routes.js";
import multerRoutes from "./routes/multer.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Procesar datos de formularios

// Configura CORS
app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/personas", personasRoutes);
app.use("/api/proyectos", proyectosRoutes);
app.use("/api/publicaciones", publicacionesRoutes);
app.use("/api/imagenes", imagenesRoutes);
app.use("/api/mainProyectos", mainProyetos);
app.use("/api/landingInfo", landingInfo);
app.use("/api/twitter", twitter);
app.use("/api/multer", multerRoutes);


// Servir imágenes subidas de forma estática
app.use("/public", express.static(path.resolve("public")));

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
