import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: Express = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from backend");
});

const PORT = process.env.NODE_DOCKER_PORT ?? 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
