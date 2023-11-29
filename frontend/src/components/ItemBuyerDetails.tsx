import Button from "react-bootstrap/Button";
import { ClaimInfo, ContactInfo, Item } from "../types";
import { useState } from "react";
import ItemService from "../services/ItemService";

const ItemBuyerDetails = ({
    claimInfo,
    item,
    toggleClaimStatus,
}: {
    claimInfo: ClaimInfo;
    item: Item;
    toggleClaimStatus: (value: boolean) => void;
}) => {
    const [sellerContact, setSellerContact] = useState<ContactInfo>();

    const getSeller = (itemId: number) => {
        ItemService.getSellerContact(itemId)
            .then((res) => {
                setSellerContact(res);
            })
            .catch((error) => {
                setSellerContact({ email: "", telegram: "" });
            });
    };

    const getContactInformation = () => {
        if (claimInfo.userClaimPosition === 1 && !sellerContact) {
            return (
                <div className="item-page-contact-information">
                    <Button
                        variant="primary"
                        onClick={() => {
                            getSeller(item.id);
                        }}
                        className="w-100"
                    >
                        Contact seller!
                    </Button>
                </div>
            );
        } else if (claimInfo.userClaimPosition === 1) {
            return (
                <div className="item-page-contact-information">
                    <span>Contact Information</span>
                    <p>Telegram: {sellerContact!.telegram}</p>
                    <p>Email: {sellerContact!.email}</p>
                </div>
            );
        } else if (
            claimInfo.userClaimPosition &&
            claimInfo.userClaimPosition > 1
        ) {
            return (
                <span>
                    Your position in queue: {claimInfo.userClaimPosition}
                </span>
            );
        } else {
            // return nothing
        }
    };

    const claimButtonStyles = () => {
        if (claimInfo.userHasClaim) {
            return "w-100 btn-danger";
        } else {
            return "w-100";
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
            <div className="mt-3">
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
