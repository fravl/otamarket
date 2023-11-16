import express, { Express, Request, Response } from "express";
import cors from "cors";
import { ItemService, UserService } from "./services";
import { UserSave } from "./dtos";

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

app.post("/auth/register", async (req: Request, res: Response) => {
    const user: UserSave = req.body;
    try {
        await UserService.add(user);
        console.log(`User ${user.email} successfully registered`);
        res.status(201).send();
    } catch (error) {
        if (error instanceof Error) res.status(400).send(error.message);
        else res.status(500).send();
    }
});

app.post("/auth/login", async (req: Request, res: Response) => {
    const credentials: { email: string; password: string } = req.body;
    try {
        const user = await UserService.verifyLogin(credentials);
        console.log(`User ${user.email} successfully logged in`);
        res.status(200).send(user);
    } catch (error) {
        if (error instanceof Error) res.status(401).send(error.message);
        else res.status(500).send();
    }
});

const PORT = process.env.NODE_DOCKER_PORT ?? 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
