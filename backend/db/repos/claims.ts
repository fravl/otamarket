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
            "SELECT * FROM claims WHERE item_id = $1 AND skipped IS NOT TRUE ORDER BY timestamp ASC",
            +itemId,
        );
    }

    getClaimsOfUser(userId: number): Promise<Claim[]> {
        return this.db.manyOrNone(
            "SELECT * FROM claims WHERE user_id = $1 AND skipped IS NOT TRUE ORDER BY timestamp ASC",
            +userId,
        );
    }

    getTopClaim(itemId: number): Promise<Claim | null> {
        return this.db.oneOrNone(
            "SELECT * FROM claims WHERE item_id = $1 AND skipped IS NOT TRUE ORDER BY timestamp ASC LIMIT 1",
            +itemId,
        )
    }

    skipTopClaim(itemId: number): Promise<any> {
        return this.db.oneOrNone(
            `WITH ranked_claims AS (
                SELECT
                    id,
                    ROW_NUMBER() OVER (ORDER BY timestamp ASC) AS row_num
                FROM
                    claims
                WHERE
                    item_id = $1
                    AND skipped IS NOT TRUE
            )
            UPDATE claims
            SET
                skipped = TRUE
            FROM
                ranked_claims
            WHERE
                claims.id = ranked_claims.id
                AND ranked_claims.row_num = 1;
            `,
            +itemId,
        )   
    }

}
