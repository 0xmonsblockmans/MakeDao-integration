"use client"
import { contracts } from "@/config/contracts";
import { DaiContext } from "@/context/daiContext";
import { Button, Input } from "@headlessui/react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider } from "ethers";
import { Contract, formatEther, parseEther } from "ethers";
import { FC, useCallback, useContext, useEffect, useState } from "react";


interface Props {
    setRad: (rad: string) => void;
}
const GemJoin: FC<Props> = ({ setRad }) => {
    const [wad, setWad] = useState('0');
    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');
    const { updateBalance } = useContext(DaiContext);


    const updateRad = useCallback(async () => {
        try {
            // @ts-ignore
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const vat = new Contract(contracts.Vat.address, contracts.Vat.abi, signer);
            const join = new Contract(contracts.GemJoin.address, contracts.GemJoin.abi, signer);
            const ilk = await join.ilk();
            const radValue = await vat.gem(ilk, address);
            setRad(formatEther(radValue));
        } catch (e) {
            console.log(e)
        }
    }, [address])

    const join = useCallback(async () => {
        // @ts-ignore
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const vat = new Contract(contracts.Vat.address, contracts.Vat.abi, signer);
        const can = await vat.can(address, contracts.GemJoin.address);
        if (Number(can) === 0) {
            const tx = await vat.hope(contracts.GemJoin.address);
            await tx.wait();
        }
        const gem = new Contract(contracts.Gem.address, contracts.Gem.abi, signer);
        const allownace = await gem.allowance(address, contracts.GemJoin.address);
        if (allownace < parseEther(wad)) {
            const tx = await gem.approve(contracts.GemJoin.address);
            await tx.wait();
        }
        const gemJoin = new Contract(contracts.GemJoin.address, contracts.GemJoin.abi, signer);
        const tx = await gemJoin.join(address, parseEther(wad));
        await tx.wait();
        updateRad();
        updateBalance();
    }, [walletProvider, wad, address])

    const exit = useCallback(async () => {
        // @ts-ignore
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const vat = new Contract(contracts.Vat.address, contracts.Vat.abi, signer);
        const can = await vat.can(address, contracts.GemJoin.address);
        if (Number(can) === 0) {
            const tx = await vat.hope(contracts.GemJoin.address);
            await tx.wait();
        }
        const gemJoin = new Contract(contracts.GemJoin.address, contracts.GemJoin.abi, signer);
        const tx = await gemJoin.exit(address, parseEther(wad));
        await tx.wait();
        updateRad();
        updateBalance();
    }, [walletProvider, wad, address]);

    return (
        <div className="w-full flex flex-col gap-2">
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
    )
}

export default GemJoin;