"use client"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import DaiJoin from "./DaiJoin";
import GemJoin from "./GemJoin";

const CollateralPage = () => {
    const [rad, setRad] = useState('0');
    const [gemRad, setGemRad] = useState('0');
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