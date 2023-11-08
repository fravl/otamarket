import express, { Express, Request, Response } from "express";
import cors from "cors";
import { ItemService } from "./services";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    try {
        res.send(await ItemService.all());
    } catch (error) {
        res.status(500).send("Error querying database");
    }
});

app.get("/items/:id", async (req: Request, res: Response) => {
    try {
        res.send(await ItemService.findById(parseInt(req.params.id)));
    } catch (error) {
        res.status(500).send("Error querying database");
    }
});

app.post("/items/add", (req: Request, res: Response) => {
    const newItem = req.body;
    if (
        newItem.title &&
        typeof newItem.description == "string" &&
        typeof parseInt(newItem.price) == "number"
    ) {
        console.log("Item received");
        console.log(req.body);
        setTimeout(() => {
            res.status(204).send();
        }, 1000);
    } else {
        res.status(400).send();
    }
});

const PORT = process.env.NODE_DOCKER_PORT ?? 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
