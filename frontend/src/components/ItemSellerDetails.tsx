import Button from "react-bootstrap/Button";

const ItemSellerDetails = () => {
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

    return (
        <>
            {getContactInformation()}
            <hr />
            <div className="item-page-button-container">
                <Button className="item-page-edit-button" variant="secondary">
                    Edit
                </Button>
                <Button className="item-page-delete-button" variant="danger">
                    Delete
                </Button>
            </div>
        </>
    );
};

export default ItemSellerDetails;
