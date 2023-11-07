import pgPromise from "pg-promise";

interface IExtensions {
    findUser(userId: number): Promise<any>;
}

// https://vitaly-t.github.io/pg-promise/global.html#event:extend
const options: pgPromise.IInitOptions<IExtensions> = {
    extend(obj) {
        obj.findUser = (userId) => {
            return obj.one("SELECT * FROM Users WHERE id = $1", [userId]);
        };
    },
};

const pgp = pgPromise(options);

let db;
if (process.env.DATABASE_URL) {
    db = pgp(process.env.DATABASE_URL);
} else {
    console.error("environment variable DATABASE_URL not found");
    db = pgp("");
}

export { db };
