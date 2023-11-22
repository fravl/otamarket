import { UsersRepository } from "./users";
import { ItemsRepository } from "./items";
import { ClaimsRepository } from "./claims";

// Database Interface Extensions:
interface IExtensions {
    users: UsersRepository;
    items: ItemsRepository;
    claims: ClaimsRepository;
}

export { IExtensions, UsersRepository, ItemsRepository, ClaimsRepository };
