import Button from "react-bootstrap/Button";

const ItemBuyerDetails = ({
    claimStatus,
    setClaimStatus,
}: {
    claimStatus: boolean;
    setClaimStatus: (arg0: React.SetStateAction<boolean>) => void;
}) => {
    const getContactInformation = () => {
        if (claimStatus) {
            return (
                <div className="item-page-contact-information">
                    <span>Contact Information</span>
                    <p>Tg: @itemseller</p>
                    <p>Email: itemseller@aalto.fi</p>
                </div>
            );
        } else {
            //return nothing
        }
    };

    const claimButtonStyles = () => {
        if (claimStatus) {
            return "item-page-button red-button";
        } else {
            return "item-page-button";
        }
    };

    const getClaimStatus = () => {
        if (claimStatus) {
            return "Unclaim";
        } else {
            return "Claim";
        }
    };

    return (
        <>
            {getContactInformation()}
            <div className="item-page-button-container">
                <Button
                    type="submit"
                    className={claimButtonStyles()}
                    onClick={() => setClaimStatus(!claimStatus)}
                >
                    {getClaimStatus()}
                </Button>
            </div>
        </>
    );
};

export default ItemBuyerDetails;
