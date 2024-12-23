"use client"

import DebtAuctionCard from "@/components/DebtAuctionCard";
import { contracts } from "@/config/contracts";
import { urls } from "@/config/urls";
import { Bid } from "@/types";
import { Button, Input } from "@headlessui/react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Contract, formatEther, parseEther } from "ethers";
import { BrowserProvider } from "ethers";
import moment from "moment";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const AuctionPage = () => {
    const [auctionList, setAuctionList] = useState<Bid[]>([]);
    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');

    useEffect(() => {
        (async () => {
            try {
                // @ts-ignore
                const ethersProvider = new BrowserProvider(walletProvider);
                const signer = await ethersProvider.getSigner();
                const flop = new Contract(contracts.Flop.address, contracts.Flop.abi, signer);
                const kicks = await flop.kicks();
                let auctions: Bid[] = [];
                for (let i = 1; i <= Number(kicks); i++) {
                    const bid = await flop.bids(i);
                    auctions.push({
                        bid: formatEther(bid[0]),
                        lot: formatEther(bid[1]),
                        guy: bid[2],
                        tic: '',
                        end: moment(new Date(Number(bid[4]) * 1000)).format('DD/MMM/YYYY')
                    })
                }
                setAuctionList(auctions);
            } catch (e) {

            }
        })();
    }, [address]);

    return (
        <div className="container flex justify-center py-10 flex-col items-center">
            <div className="flex justify-end w-full">
                <Link className="bg-green-500 px-4 rounded-md py-2" href={urls.createDebtAuction}>Create</Link>
            </div>
            <div className="flex flex-col gap-2 lg:w-1/3 w-full">
                {
                    auctionList.map((auction, i) => (
                        <DebtAuctionCard 
                            key={i}
                            auction={auction}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default AuctionPage;