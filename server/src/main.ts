import express from "express";
import seedRouter from "./routes/seed.router";
import authRouter from "./routes/auth.router";
import fileRouter from "./routes/file.router";
import cors from "cors";
import userRouter from "./routes/user.router";
import "dotenv/config";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const globalPrefix = "/api";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(globalPrefix, seedRouter);
app.use(globalPrefix, authRouter);
app.use(globalPrefix, fileRouter);
app.use(globalPrefix, userRouter);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación de API",
      version: "1.0.0",
      description: "Documentación de las API de mi aplicación",
    },
  },
  apis: ["./src/routes/auth.router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(Number(process.env.PORT) | 5500, () => {
  console.log(
    "The application is running in https://localhost:" + process.env.PORT
  );
});
