import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: Express = express();

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:8081",
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
