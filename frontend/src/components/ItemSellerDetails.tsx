import Button from "react-bootstrap/Button";
import ItemService from "../services/ItemService";
import { Item, ContactInfo, ClaimInfo } from "../types";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const ItemSellerDetails = ({ item, claimInfo }: { item: Item, claimInfo: ClaimInfo }) => {
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
            setDetails({'email': '', 'telegram': ''});
        });
    }

    const skipBuyer = (itemId: number) => {
        ItemService.skipClaim(item.id)
        .then((res) => {
            updateDetails(itemId);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getContactInformation = () => {
        //let info = <React.Fragment><span>No buyers in queue!</span></React.Fragment>;
        return (
            <div className="item-page-contact-information">
                {claimCount === 0 && <span>No buyers in queue!</span>}
                {claimCount > 0 && !details && 
                    <Button variant="primary" onClick={() => {updateDetails(item.id)}}>View first person in que</Button>
                }
                {claimCount > 0 && details &&
                    <React.Fragment>
                        <span>First In Queue:</span>
                        <p>Email: {details?.email}</p>
                        <p>Telegram: {details?.telegram}</p>
                        <Button
                            variant="warning"
                            onClick={() => {
                                    skipBuyer(item.id);
                                    setCC((prevCC) => Math.max(prevCC - 1, 0));
                                    alert("We skipped to next interested buyer in queue");
                                }
                            }
                        >
                            SKIP
                        </Button>
                    </React.Fragment>
                }
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
            <div className="item-page-button-container">
                <Button className="item-page-edit-button" variant="secondary">
                    Edit
                </Button>
                <Button
                    className="item-page-delete-button"
                    variant="danger"
                    onClick={() => onDelete()}
                >
                    Delete
                </Button>
            </div>
        </>
    );
};

export default ItemSellerDetails;
