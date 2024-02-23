import express, { Request, Response, Express } from "express";
import * as path from "path";
import cors from "cors";
import errorManager from "./services/errorManager";
import router from "./router";

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
  })
);

app.use(router);

app.use(express.static("./public"));

/*app.use("/images", express.static(path.join(__dirname, "images")));

/*app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});*/

app.use(errorManager);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
