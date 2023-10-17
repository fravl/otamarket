import Button from "react-bootstrap/Button";

const ProdctBuyerDetails = ({
    claimStatus,
    setClaimStatus,
}: {
    claimStatus: boolean;
    setClaimStatus: (arg0: React.SetStateAction<boolean>) => void;
}) => {
    const getContactInformation = () => {
        if (claimStatus) {
            return (
                <div className="product-page-contact-information">
                    <span>Contact Information</span>
                    <p>Tg: @productseller</p>
                    <p>Email: productseller@aalto.fi</p>
                </div>
            );
        } else {
            //return nothing
        }
    };

    const claimButtonStyles = () => {
        if (claimStatus) {
            return "product-page-button red-button";
        } else {
            return "product-page-button";
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
            <div className="product-page-button-container">
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

export default ProdctBuyerDetails
