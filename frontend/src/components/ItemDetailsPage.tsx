import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ItemBuyerDetails from "./ItemBuyerDetails";
import ItemDetails from "./ItemDetails";
import ItemSellerDetails from "./ItemSellerDetails";
import Button from "react-bootstrap/Button";
import BackAndTitleNav from "./BackAndTitleNav";
import Navbar from "./Navbar";
import { Item } from "../types";
import ItemImage from "./ItemImage";

const ItemDetailsPage = () => {
    const { item } = useLoaderData() as { item: Item };
    const [claimStatus, setClaimStatus] = useState<boolean>(false);
    const [sellerStatus, setSellerStatus] = useState<boolean>(false);

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

    if (!item) {
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
