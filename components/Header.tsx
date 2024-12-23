"use client"
import { FC, useContext, useEffect, useState } from "react";
import ConnectButton from "./ConnectButton";
import { useAppKitAccount } from "@reown/appkit/react";
import Link from "next/link";
import { DaiContext } from "@/context/daiContext";
import { urls } from "@/config/urls";


interface Props { }

const Header: FC<Props> = () => {
    const { address } = useAppKitAccount();
    const { balance, updateBalance, gBalance } = useContext(DaiContext);

    useEffect(() => {
        updateBalance();
    }, [address]);

    return (
        <div className="bg-black/20 py-4">
            <div className="flex container items-center gap-8">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div>Dai:</div>
                        <div className="truncate">{Number(balance).toFixed(4)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>Gem:</div>
                        <div className="truncate">{Number(gBalance).toFixed(4)}</div>
                    </div>
                </div>
                <div className="flex gap-4 items-center justify-center flex-1 text-xl">
                    <Link href={urls.collateral}>Collateral</Link>
                    <Link href={urls.debtAuction}>Debt Auction</Link>
                    <Link href={urls.surpluseAuction}>Surpluse Auction</Link>
                </div>
                <ConnectButton />
            </div>
        </div>
    )
}

export default Header;