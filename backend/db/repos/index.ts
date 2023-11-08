import { UsersRepository } from "./users";
import { ItemsRepository } from "./items";

// Database Interface Extensions:
interface IExtensions {
    users: UsersRepository;
    items: ItemsRepository;
}

export { IExtensions, UsersRepository, ItemsRepository };
