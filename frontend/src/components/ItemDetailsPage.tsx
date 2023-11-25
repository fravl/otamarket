import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ItemBuyerDetails from "./ItemBuyerDetails";
import ItemDetails from "./ItemDetails";
import ItemSellerDetails from "./ItemSellerDetails";
import BackAndTitleNav from "./BackAndTitleNav";
import Navbar from "./Navbar";
import { ClaimInfo, Item } from "../types";
import ItemImage from "./ItemImage";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";

const ItemDetailsPage = () => {
    const { item, claimInfo: initialClaimInfo } = useLoaderData() as {
        item: Item;
        claimInfo: ClaimInfo;
    };

    const [claimInfo, setClaimInfo] = useState<ClaimInfo>(initialClaimInfo);

    const toggleClaimStatus = async (newValue: boolean) => {
        if (newValue) {
            await ItemService.claimItem(item.id);
        } else {
            await ItemService.unclaimItem(item.id);
        }
        await ItemService.getClaimInfo(item.id).then((newInfo) =>
            setClaimInfo(newInfo),
        );
    };

    const getAdditionalInfo = () => {
        if (AuthService.getUserId() !== item.seller_id) {
            return (
                <ItemBuyerDetails
                    claimInfo={claimInfo}
                    toggleClaimStatus={toggleClaimStatus}
                />
            );
        } else {
            return <ItemSellerDetails item={item} />;
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
