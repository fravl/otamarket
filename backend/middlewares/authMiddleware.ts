import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";
import { JwtToken } from "../types";
import { UserService } from "../services";

export const auth: RequestHandler = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers?.authorization?.split(" ")[1];
        console.log(token);
        if (!token) {
            throw new Error("Missing authentication header");
        }
        const decodedToken = jwt.verify(token, "RANDOM-TOKEN") as JwtToken;

        const user = await UserService.findByEmail(decodedToken.userEmail);
        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            error: new Error("Invalid request!"),
        });
    }
};
