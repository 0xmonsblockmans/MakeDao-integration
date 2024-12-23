"use client"
import { contracts } from "@/config/contracts";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Contract, formatEther } from "ethers";
import { BrowserProvider } from "ethers";
import { createContext, useCallback, useState } from "react";

interface DaiContextProps {
    balance: string;
    updateBalance: () => void;
    gBalance: string;
}

export const DaiContext = createContext({} as DaiContextProps);


const DaiContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [balance, setBalance] = useState('0');
    const [gBalance, setGBalance] = useState('0');

    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');
    const updateBalance = useCallback(async () => {
        try {
            if (!address) return;
            // @ts-ignore
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const daiContract = new Contract(contracts.Dai.address, contracts.Dai.abi, signer);
            const dBalance = await daiContract.balanceOf(address);
            const gemContract = new Contract(contracts.Gem.address, contracts.Gem.abi, signer);
            const gemBalance = await gemContract.balanceOf(address);
            setGBalance(formatEther(gemBalance));
            setBalance(formatEther(dBalance));
        } catch {

        }

    }, [address]);

    return (
        <DaiContext.Provider value={{ balance, updateBalance, gBalance }}>
            {children}
        </DaiContext.Provider>
    )
}

export default DaiContextProvider;