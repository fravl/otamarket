import Button from "react-bootstrap/Button";
import { ClaimInfo } from "../types";

const ItemBuyerDetails = ({
    claimInfo,
    toggleClaimStatus,
}: {
    claimInfo: ClaimInfo;
    toggleClaimStatus: (value: boolean) => void;
}) => {
    const getContactInformation = () => {
        if (claimInfo.userClaimPosition === 1) {
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
        if (claimInfo.userHasClaim) {
            return "item-page-button red-button";
        } else {
            return "item-page-button";
        }
    };

    const getClaimStatus = () => {
        if (claimInfo.userHasClaim) {
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
                    onClick={() => toggleClaimStatus(!claimInfo.userHasClaim)}
                >
                    {getClaimStatus()}
                </Button>
            </div>
        </>
    );
};

export default ItemBuyerDetails;
