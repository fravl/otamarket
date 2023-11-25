import { IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import { Claim } from "../models";

export class ClaimsRepository {
    constructor(
        private db: IDatabase<any>,
        private pgp: IMain,
    ) {}

    removeClaim(itemId: number, userId: number): Promise<number> {
        return this.db.result(
            "DELETE FROM claims WHERE user_id = $1 AND item_id = $2",
            [+userId, +itemId],
            (r: IResult) => r.rowCount,
        );
    }

    addClaim(itemId: number, userId: number): Promise<Claim> {
        return this.db.one(
            "INSERT INTO claims(item_id, user_id) VALUES(${item_id}, ${user_id}) RETURNING *",
            {
                item_id: itemId,
                user_id: userId,
            },
        );
    }

    findByItemId(itemId: number): Promise<Claim[]> {
        return this.db.manyOrNone(
            "SELECT * FROM claims WHERE item_id = $1 ORDER BY timestamp ASC",
            +itemId,
        );
    }

    getClaimsOfUser(userId: number): Promise<Claim[]> {
        return this.db.manyOrNone(
            "SELECT * FROM claims WHERE user_id = $1 ORDER BY timestamp ASC",
            +userId,
        );
    }

}
