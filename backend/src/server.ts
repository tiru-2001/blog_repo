import express, { Request, Response } from "express";
import config from "./config/config";
import connectToDB from "./config/db";
import router from "./routes";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import "colors";
import errorHandler from "./middlewares/errormiddleware";
const app = express();
connectToDB();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://blog-repo-alpha.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);
app.get("/health", (req: Request, res: Response) => {
  res.send("hi Iam on ");
});
app.listen(config.port, () => {
  console.log(`server is listening on port${config.port}`.bgBlue);
});
