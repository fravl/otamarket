import db from "../db";
import { Claim } from "../db/models";

export async function claimItem(
    itemId: number,
    userId: number,
): Promise<Claim> {
    const claim = await db.claims.addClaim(itemId, userId);
    return claim;
}

export async function unclaimItem(itemId: number, userId: number) {
    await db.claims.removeClaim(itemId, userId);
}

export async function getClaimInfo(
    itemId: number,
    userId: number,
): Promise<{
    claimCount: number;
    userHasClaim: boolean;
    userClaimPosition: number | null;
}> {
    const claims = await db.claims.findByItemId(itemId);
    const userClaimPosition = claims.findIndex(
        (claim) => claim.user_id === userId,
    );

    return {
        claimCount: claims.length,
        userHasClaim: userClaimPosition !== -1,
        userClaimPosition: userClaimPosition !== -1 ? userClaimPosition : null,
    };
}
