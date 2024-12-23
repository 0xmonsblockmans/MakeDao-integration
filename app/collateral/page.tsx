"use client"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import DaiJoin from "./DaiJoin";
import GemJoin from "./GemJoin";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { BrowserProvider, formatEther } from "ethers";
import { Contract } from "ethers";
import { contracts } from "@/config/contracts";

const CollateralPage = () => {
    const [rad, setRad] = useState('0');
    const [gemRad, setGemRad] = useState('0');

    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');

    useEffect(() => {
        updateRad();
    }, [address]);

    const updateRad = useCallback(async () => {
        try {
            // @ts-ignore
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const vat = new Contract(contracts.Vat.address, contracts.Vat.abi, signer);
            const radValue = await vat.dai(address);
            setRad(String(Number(formatEther(radValue)) / (10 ** 27)));
            const join = new Contract(contracts.GemJoin.address, contracts.GemJoin.abi, signer);
            const ilk = await join.ilk();
            const gemValue = await vat.gem(ilk, address);
            setGemRad(formatEther(gemValue));
        } catch (e) {

        }
    }, [address]);

    return (
        <div className="container flex flex-col gap-2 items-center py-10">
            <div className="lg:w-1/3 w-full flex flex-col gap-4">
                <div className="text-xl font-bold">Vault</div>
                <div className="border p-4">
                    <div className="flex">
                        <div className="flex-1">Dai:</div>
                        <div>{rad}</div>
                    </div>
                    <div className="flex">
                        <div className="flex-1">Gem:</div>
                        <div>{gemRad}</div>
                    </div>
                </div>
            </div>
            <TabGroup className="lg:w-1/3 w-full flex flex-col gap-4">
                <TabList className="flex gap-4">
                    <Tab key="daiJoin" className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                        Dai
                    </Tab>
                    <Tab key="gemJoin" className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                        Gem
                    </Tab>
                </TabList>
                <TabPanels className="mt-3">
                    <TabPanel
                        key="daiJoin"
                    >
                        <DaiJoin setRad={setRad} />
                    </TabPanel>
                    <TabPanel
                        key="gemJoin"
                    >
                        <GemJoin setRad={setGemRad} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
}

export default CollateralPage;