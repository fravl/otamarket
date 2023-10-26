import express, { Express, Request, Response } from "express";
import cors from "cors";
import https from "https";
import "dotenv/config";

const app: Express = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    https
        .get("https://dummyjson.com/products", (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                res.send(data);
            });
        })
        .on("error", (err) => {
            console.log("Error: " + err.message);
            res.status(500).send("Error fetching data from external API");
        });
});

app.get("/items/:id", (req: Request, res: Response) => {
    https
        .get(`https://dummyjson.com/products/${req.params.id}`, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                res.send(data);
            });
        })
        .on("error", (err) => {
            console.log("Error: " + err.message);
            res.status(500).send("Error fetching data from external API");
        });
});

const PORT = process.env.NODE_DOCKER_PORT ?? 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
