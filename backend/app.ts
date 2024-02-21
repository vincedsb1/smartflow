import express, { Request, Response, Express } from 'express';
import * as path from 'path';
import cors from 'cors';
import errorManager from './services/errorManager';

const app: Express = express(); // Ajoutez le type d'Express explicitement
app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000', // provide a default value
    ],
  })
);

app.use(express.static("./public"));

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.use(errorManager);

export default app;
