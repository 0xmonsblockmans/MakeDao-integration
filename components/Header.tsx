"use client"
import { FC, useContext, useEffect, useState } from "react";
import ConnectButton from "./ConnectButton";
import { useAppKitAccount } from "@reown/appkit/react";
import Link from "next/link";
import { DaiContext } from "@/context/DaiContext";


interface Props { }

const Header: FC<Props> = () => {
    const { address } = useAppKitAccount();
    const { balance, updateBalance } = useContext(DaiContext);

    useEffect(() => {
        updateBalance();
    }, [address]);

    return (
        <div className="bg-black/20 py-4">
            <div className="flex container items-center gap-8">
                <div className="flex gap-4">
                    <div className="w-1/2 flex flex-col  items-center">
                        <div>Dai</div>
                        <div className="truncate">{balance}</div>
                    </div>
                </div>
                <div className="flex gap-2 items-center justify-center flex-1">
                    <Link href="/collateral">Collateral</Link>
                </div>
                <ConnectButton />
            </div>
        </div>
    )
}

export default Header;