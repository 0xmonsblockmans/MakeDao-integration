"use client"

import { contracts } from "@/config/contracts";
import { DaiContext } from "@/context/daiContext";
import { Button, Input } from "@headlessui/react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Contract, formatEther, parseEther } from "ethers";
import { BrowserProvider } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";

const CollateralPage = () => {
    const [rad, setRad] = useState('0');
    const [wad, setWad] = useState('0');
    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');
    const { updateBalance } = useContext(DaiContext);


    useEffect(() => {
        updateRad();
    }, [address]);

    const updateRad = useCallback(async () => {
        // @ts-ignore
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const vat = new Contract(contracts.Vat.address, contracts.Vat.abi, signer);
        const radValue = await vat.dai(address);
        setRad(formatEther(radValue));
    }, [address])

    const join = useCallback(async () => {
        // @ts-ignore
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const vat = new Contract(contracts.Vat.address, contracts.Vat.abi, signer);
        const can = await vat.can(address, contracts.DaiJoin.address);
        if (Number(can) === 0) {
            const tx = await vat.hope(contracts.DaiJoin.address);
            await tx.wait();
        }
        const dai = new Contract(contracts.Dai.address, contracts.Dai.abi, signer);
        const allownace = await dai.allowance(address, contracts.DaiJoin.address);
        if (allownace < parseEther(wad)) {
            const tx = await dai.approve(contracts.DaiJoin.address, parseEther(wad));
            await tx.wait();
        }
        const daiJoin = new Contract(contracts.DaiJoin.address, contracts.DaiJoin.abi, signer);
        const tx = await daiJoin.join(address, parseEther(wad));
        await tx.wait();
        updateRad();
        updateBalance();
    }, [walletProvider, wad, address])

    const exit = useCallback(async () => {
        // @ts-ignore
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const vat = new Contract(contracts.Vat.address, contracts.Vat.abi, signer);
        const can = await vat.can(address, contracts.DaiJoin.address);
        if (Number(can) === 0) {
            const tx = await vat.hope(contracts.DaiJoin.address);
            await tx.wait();
        }
        const daiJoin = new Contract(contracts.DaiJoin.address, contracts.DaiJoin.abi, signer);
        const tx = await daiJoin.exit(address, wad);
        await tx.wait();
        updateRad();
        updateBalance();
    }, [walletProvider, wad, address])  

    return (
        <div className="container flex flex-col gap-2 items-center py-10">
            <div className="lg:w-1/3 w-full flex flex-col gap-4">
                <div className="text-xl font-bold">Vault</div>
                <div className="border p-4">
                    <div className="flex">
                        <div className="flex-1">Dai:</div>
                        <div>{rad}</div>
                    </div>
                </div>
                <div>
                    <div>
                        Please input dai join or exit amount
                    </div>
                    <Input
                        value={wad}
                        onChange={(e) => setWad(e.target.value)}
                        className="w-full h-[40px] rounded-md text-black text-right px-4"
                    />
                </div>
                <Button
                    onClick={join}
                    className="w-full h-[40px] bg-green-500/50 rounded-md"
                >
                    Join
                </Button>
                <Button
                    onClick={exit}
                    className="w-full h-[40px] bg-pink-500/50 rounded-md"
                >
                    Exit
                </Button>
            </div>
        </div>
    );
}

export default CollateralPage;