import Button from "react-bootstrap/Button";
import ItemService from "../services/ItemService";
import { Item } from "../types";

const ItemSellerDetails = ({ item }: { item: Item }) => {
    const getContactInformation = () => {
        return (
            <div className="item-page-contact-information">
                <span>First In Queue</span>
                <p>Tg: @interestedbuyer</p>
                <p>Email: interestedbuyer@aalto.fi</p>
                <Button
                    variant="warning"
                    onClick={() =>
                        alert("We skipped to next interested buyer in queue")
                    }
                >
                    SKIP
                </Button>
            </div>
        );
    };

    const onDelete = async () => {
        if(confirm(`Are you sure you want to remove this item from your listings?`)){
           await ItemService.removeItem(item.id)
        }
    }

    return (
        <>
            {getContactInformation()}
            <hr />
            <div className="item-page-button-container">
                <Button className="item-page-edit-button" variant="secondary">
                    Edit
                </Button>
                <Button className="item-page-delete-button" variant="danger" onClick={() => onDelete()}>
                    Delete
                </Button>
            </div>
        </>
    );
};

export default ItemSellerDetails;
