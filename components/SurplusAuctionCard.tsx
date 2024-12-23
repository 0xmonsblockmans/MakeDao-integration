import { contracts } from "@/config/contracts";
import { Bid } from "@/types";
import { Button } from "@headlessui/react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import { FC, useCallback, useState } from "react";
import SurplusBidDlg from "./SurplusBidDlg";


interface Props {
    auction: Bid;
}

const SurplusAuctionCard: FC<Props> = ({ auction }) => {
    const [openBid, setOpenBid] = useState(false);

    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');
    const deal = useCallback(async () => {
        //@ts-ignore
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const flap = new Contract(contracts.Flap.address, contracts.Flap.abi, signer);
        const tx = await flap.deal(
            auction.id
        )
        await tx.wait();
    }, []);
    return (
        <div className="border w-full p-4 rounded-xl bg-white/30 gap-2 flex flex-col">
            <SurplusBidDlg
                auction={auction}
                isOpen={openBid}
                onClose={() => setOpenBid(false)}
            />
            <div className="flex">
                <div className="flex-1">Gem amount</div>
                <div>{auction.lot}</div>
            </div>
            <div className="flex">
                <div className="flex-1">Min bid amount in dai</div>
                <div>{auction.bid}</div>
            </div>
            <div className="flex">
                <div className="flex-1">End</div>
                <div>{auction.end}</div>
            </div>
            <Button
                onClick={() => setOpenBid(true)}
                className="w-full h-[30px] bg-pink-500/50 rounded-md"
            >
                Bid
            </Button>
            {
                auction.guy.toLowerCase() === address?.toLowerCase() && (
                    <Button
                        onClick={deal}
                        className="w-full h-[30px] bg-green-500/50 rounded-md"
                    >
                        Deal
                    </Button>
                )
            }
        </div>
    )
}

export default SurplusAuctionCard;