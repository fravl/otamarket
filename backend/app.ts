import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { ClaimsService, ItemService, UserService } from "./services";
import { authMiddleware } from "./middlewares/authMiddleware";
import { JwtToken } from "./types";
import { UserSave, ItemSave } from "./dtos";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use(authMiddleware);

app.get("/", async (req: Request, res: Response) => {
    try {
        res.send(await ItemService.all());
    } catch (error) {
        res.status(500).send("Error querying database");
    }
});

app.get("/categories", async (req: Request, res: Response) => {
    try {
        res.send(await ItemService.allCategories());
    } catch (error) {
        res.status(500).send("Error querying database");
    }
});

app.get("/categories/items", async (req: Request, res: Response) => {
    try {
        res.send(await ItemService.allItemCategories());
    } catch (error) {
        res.status(500).send("Error querying database");
    }
});

app.get("/items/:id", async (req: Request, res: Response) => {
    //const imgIds = [];
    //imgIds.forEach((id) => {
    //    newItem.images.push(`/items/${id}.jpg`)
    //});
    try {
        await ItemService.findById(parseInt(req.params.id)).then(
            async (item) => {},
        );
        res.send(await ItemService.findById(parseInt(req.params.id)));
    } catch (error) {
        res.status(500).send("Error querying database");
    }
});

app.delete("/items/:id", async (req: Request, res: Response) => {
    try {
        res.send(await ItemService.removeItem(parseInt(req.params.id)));
    } catch (error) {
        res.status(500).send("Error querying database");
    }
});

app.post("/items", async (req: Request, res: Response) => {
    const raw = req.body;
    raw.seller_id = req.body.seller_id;
    raw.thumbnail_id = null;
    try {
        raw.price = +raw.price;
        const newItem: ItemSave = raw;

        const addedItem = await ItemService.addItem(
            newItem,
            req.body.categories,
        );
        const base64imgs: string[] = raw.images;
        let tn = true;
        base64imgs.forEach(async (img: string) => {
            const data = img.split(",");
            if (data[0].startsWith("data:image")) {
                const ext = data[0].split(":")[1];
                const img = await ItemService.addImage(
                    data[1],
                    ext,
                    addedItem.id,
                );
                if (tn) {
                    await ItemService.addThumbnail(addedItem.id, img.id);
                    tn = false;
                }
            } else {
                console.log(`Invalid image header ${data[0]}`);
            }
        });
        console.log(`Item ${newItem.title} added.`);
        res.status(201).send({ itemId: addedItem.id });
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error ${error.message}`);
            res.status(400).send(error.message);
        } else res.status(500).send();
    }
});

app.get("/image/:id.jpg", async (req: Request, res: Response) => {
    console.log(`img ${req.params.id} requested`);
    res.set("Content-Type", "image/jpg");
    await ItemService.getImage(+req.params.id).then((img) => {
        if (img !== null) res.send(img.image);
        else res.status(404).send("Img not found");
    });
});

app.get("/items/:id/claims", async (req: Request, res: Response) => {
    const user = req.user!;
    res.send(await ClaimsService.getClaimInfo(+req.params.id, user.id));
});

app.get("/items/claims/:id", async (req: Request, res: Response) => {
    const user = req.user!;
    res.send(await ClaimsService.getClaimsOfUser(user.id));
});

app.post("/items/:id/claims", async (req: Request, res: Response) => {
    const user = req.user!;
    try {
        res.status(201).send(
            await ClaimsService.claimItem(+req.params.id, user.id),
        );
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

app.put("/items/:id/claims/skip", async (req: Request, res: Response) => {
    const user = req.user!;
    await ItemService.findById(+req.params.id).then(async (item) => {
        if (item) {
            console.log(`seller: ${item.seller_id} user: ${user.id}`);
            if (+item.seller_id === +user.id) {
                res.status(201).send(await ClaimsService.skipClaim(item.id));
            } else res.status(401).send("Unauthorized");
        } else res.status(404).send();
    });
});

app.delete("/items/:id/claims", async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");
    try {
        await ClaimsService.unclaimItem(+req.params.id, user.id);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

app.get("/items/:id/contact", async (req: Request, res: Response) => {
    await ItemService.findById(+req.params.id).then(async (item) => {
        if (item) {
            const seller = await UserService.findById(item!.seller_id);
            res.status(201).send({
                telegram: seller?.telegram,
                email: seller?.email,
            });
        } else res.status(404).send();
    });
});

app.get("/items/:id/claims/contact", async (req: Request, res: Response) => {
    const user = req.user!;
    await ItemService.findById(+req.params.id).then(async (item) => {
        if (item) {
            console.log(`seller: ${item.seller_id} user: ${user.id}`);
            if (+item.seller_id === +user.id) {
                const topClaim = await ClaimsService.getTopClaim(item.id);
                if (topClaim) {
                    const claimer = await UserService.findById(
                        topClaim.user_id,
                    );
                    res.status(201).send({
                        telegram: claimer?.telegram,
                        email: claimer?.email,
                    });
                } else res.status(201).send({});
            } else res.status(401).send("Unauthorized");
        } else res.status(404).send();
    });
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
            id: user.id,
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
