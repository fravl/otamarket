import Button from "react-bootstrap/Button";

const ProductSellerDetails = () => {

    const getContactInformation = () => {
            return (
                <div className="product-page-contact-information">
                    <span>First In Queue</span>
                    <p>Tg: @interestedbuyer</p>
                    <p>Email: interestedbuyer@aalto.fi</p>
                    <Button
                    variant="warning"
                    onClick={() => alert("We skipped to next interested buyer in queue")}
                >
                    SKIP
                </Button>
                </div>
            );
    };


    return(
        <>
            {getContactInformation()}
            <hr/>
            <div className="product-page-button-container">
            <Button
            className="product-page-edit-button"
            variant="secondary"
            >Edit</Button>
            <Button
            className="product-page-delete-button"
            variant="danger"
            >Delete</Button>
            </div>
        </>
    )
}

export default ProductSellerDetails;