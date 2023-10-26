import React, { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import ItemOutletContext from "./Contexts/ItemOutletContext";
import ItemBuyerDetails from "./ItemBuyerDetails";
import ItemImage from "./ItemImage";
import ItemDetails from "./ItemDetails";
import ItemSellerDetails from "./ItemSellerDetails";
import Button from "react-bootstrap/Button";
import BackAndTitleNav from "./BackAndTitleNav";
import Navbar from "./Navbar";

const ItemDetailsPage = () => {
    const { id } = useParams();
    const items = useOutletContext<ItemOutletContext>().items;
    const [claimStatus, setClaimStatus] = useState<boolean>(false);
    const [sellerStatus, setSellerStatus] = useState<boolean>(false);

    const getItemById = (id: string | undefined) => {
        if (id !== undefined) {
            return items.find((item) => item.id == Number(id));
        } else {
            return undefined;
        }
    };

    const getAdditionalInfo = () => {
        if (sellerStatus) {
            return (
                <ItemBuyerDetails
                    claimStatus={claimStatus}
                    setClaimStatus={setClaimStatus}
                />
            );
        } else {
            return <ItemSellerDetails />;
        }
    };

    const item = getItemById(id);

    if (item === undefined) {
        return (
            <>
                <Navbar />
                <div>Placeholder</div>
            </>
        );
    } else {
        return (
            <div className="item-page">
                <BackAndTitleNav title={item.title} />
                <Button
                    variant="light"
                    onClick={() => setSellerStatus(!sellerStatus)}
                >
                    Toggle POV
                </Button>
                <div className="item-page-info-container">
                    <div className="row">
                        <ItemImage item={item} />
                        <div className="col-10 mx-auto col-md-6 col-lg-6 my-3 item-page-info">
                            <ItemDetails item={item} />
                            {getAdditionalInfo()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ItemDetailsPage;
