import { Bid } from "@/types";
import { FC } from "react";
import truncateEthAddress from "truncate-eth-address";


interface Props {
    auction: Bid;
}

const DebtAuctionCard:FC<Props> = ({auction}) => {
    return (
        <div className="border w-full p-4 rounded-xl">
            <div className="flex">
                <div className="flex-1">Creator</div>
                <div>{truncateEthAddress(auction.guy)}</div>
            </div>
            <div className="flex">
                <div className="flex-1">Gem amount</div>
                <div>{auction.lot}</div>
            </div>
            <div className="flex">
                <div className="flex-1">Bid amount in dai</div>
                <div>{auction.lot}</div>
            </div>
            <div className="flex">
                <div className="flex-1">End</div>
                <div>{auction.end}</div>
            </div>
        </div>
    )
}

export default DebtAuctionCard;