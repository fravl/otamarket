import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { ItemService, UserService } from "./services";
import { authMiddleware } from "./middlewares/authMiddleware";
import { JwtToken } from "./types";
import { UserSave, ItemSave } from "./dtos";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
app.use(authMiddleware);

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

app.post("/items/add", async (req: Request, res: Response) => {
    const raw = req.body;
    const categories = req.body.categories;
    raw.seller_id = 1;
    raw.thumbnail_id = null;
    try {
        raw.price = +raw.price
        const newItem: ItemSave = raw;
        await ItemService.addItem(newItem, req.body.categories);
        console.log(`Item ${newItem.title} added.`);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error ${error.message}`);
            res.status(400).send(error.message);
        } else res.status(500).send();
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
        const tokenPayload: JwtToken = {
            userId: user.id,
            userEmail: user.email,
        };
        const token = jwt.sign(tokenPayload, "RANDOM-TOKEN", {
            expiresIn: "24h",
        });
        res.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
        });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) res.status(401).send(error.message);
        else res.status(500).send();
    }
});

const PORT = process.env.NODE_DOCKER_PORT ?? 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
