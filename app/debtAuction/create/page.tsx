"use client"
import { contracts } from "@/config/contracts";
import { urls } from "@/config/urls";
import { Button, Input } from "@headlessui/react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider } from "ethers";
import { Contract, parseEther } from "ethers";
import Link from "next/link";
import { useCallback, useState } from "react";

const CreateAuctionPage = () => {
    const [lot, setLot] = useState('0');
    const [bid, setBid] = useState('0');

    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');

    const create = useCallback(async () => {
        // @ts-ignore
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const flop = new Contract(contracts.Flop.address, contracts.Flop.abi, signer);
        const tx = await flop.kick(address, parseEther(lot), parseEther(bid));
        await tx.wait();
    }, [address, lot, bid]);

    return (
        <div className="flex justify-center container py-10 items-center flex-col">
            <div className="flex justify-end w-full">
                <Link className="bg-green-500 px-4 rounded-md py-2" href={urls.debtAuction}>Auctions</Link>
            </div>
            <div className="lg:w-1/3 w-full flex flex-col gap-2">
                <div>
                    <div>
                       Max gem amount for auction
                    </div>
                    <Input
                        value={lot}
                        onChange={e => setLot(e.target.value)}
                        className="w-full h-[40px] text-black px-2 text-right rounded-md"
                    />
                </div>
                <div>
                    <div>
                        Bid amount in dai
                    </div>
                    <Input
                        value={bid}
                        onChange={e => setBid(e.target.value)}
                        className="w-full h-[40px] text-black px-2 text-right rounded-md"
                    />
                </div>
                <Button
                    onClick={create}
                    className="bg-green-500/50 w-full h-[40px] rounded-md"
                >
                    Create Auction
                </Button>
            </div>
        </div>
    );
}

export default CreateAuctionPage;