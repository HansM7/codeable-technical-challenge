import express from "express";
import seedRouter from "./routes/seed.route";
import authRouter from "./routes/auth.router";
import fileRouter from "./routes/file.router";
import cors from "cors";

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

app.listen(5500);
