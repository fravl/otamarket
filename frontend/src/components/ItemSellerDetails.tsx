import Button from "react-bootstrap/Button";
import ItemService from "../services/ItemService";
import { Item, ContactInfo, ClaimInfo } from "../types";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const ItemSellerDetails = ({
    item,
    claimInfo,
}: {
    item: Item;
    claimInfo: ClaimInfo;
}) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/sales";
        navigate(path);
    };

    const [details, setDetails] = useState<ContactInfo>();

    const [claimCount, setCC] = useState(claimInfo.claimCount);

    const updateDetails = (itemId: number) => {
        ItemService.getTopContact(item.id)
            .then((res) => {
                setDetails(res);
            })
            .catch((error) => {
                setDetails({ email: "", telegram: "" });
            });
    };

    const skipBuyer = (itemId: number) => {
        ItemService.skipClaim(item.id)
            .then((res) => {
                updateDetails(itemId);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getContactInformation = () => {
        //let info = <React.Fragment><span>No buyers in queue!</span></React.Fragment>;
        return (
            <div className="item-page-contact-information d-flex flex-column">
                {claimCount === 0 && <span>No claims yet!</span>}
                {claimCount > 0 && (
                    <span>{`There are ${claimCount} claims`}</span>
                )}
                {claimCount > 0 && !details && (
                    <Button
                        variant="primary"
                        onClick={() => {
                            updateDetails(item.id);
                        }}
                        className="w-100"
                    >
                        Contact first in queue
                    </Button>
                )}
                {claimCount > 0 && details && (
                    <React.Fragment>
                        <span>First In Queue:</span>
                        <p>Email: {details?.email}</p>
                        <p>Telegram: {details?.telegram}</p>
                        <Button
                            variant="warning"
                            onClick={() => {
                                skipBuyer(item.id);
                                setCC((prevCC) => Math.max(prevCC - 1, 0));
                            }}
                            className="w-100"
                        >
                            Skip buyer
                        </Button>
                    </React.Fragment>
                )}
            </div>
        );
    };

    const onDelete = async () => {
        if (
            confirm(
                `Are you sure you want to remove this item from your listings?`,
            )
        ) {
            await ItemService.removeItem(item.id);
            routeChange();
        }
    };

    return (
        <>
            {getContactInformation()}
            <hr />
            <Button
                className="w-100"
                variant="danger"
                onClick={() => onDelete()}
            >
                Delete
            </Button>
        </>
    );
};

export default ItemSellerDetails;
