import { contracts } from "@/config/contracts";
import { Bid } from "@/types";
import { Button, Dialog, DialogPanel, DialogTitle, Input } from "@headlessui/react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Contract, parseEther } from "ethers";
import { BrowserProvider } from "ethers";
import { FC, useCallback, useState } from "react";


interface Props {
    auction: Bid;
    isOpen: boolean;
    onClose: () => void;
}

const SurplusBidDlg: FC<Props> = ({ auction, isOpen, onClose }) => {
    const [bid, setBid] = useState('0');

    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');
    const handleBid = useCallback(async () => {
        // @ts-ignore
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const flap = new Contract(contracts.Flap.address, contracts.Flap.abi, signer);
        const vat = new Contract(contracts.Vat.address, contracts.Vat.abi, signer);
        const can = await vat.can(address, contracts.Flap.address);
        if (Number(can) === 0) {
            const tx = await vat.hope(contracts.Flap.address);
            await tx.wait();
        }
        const dai = new Contract(contracts.Dai.address, contracts.Dai.abi, signer);
        const allownace = await dai.allowance(address, contracts.Flap.address);
        if (allownace < parseEther(bid)) {
            const tx = await dai.approve(contracts.Flap.address, parseEther(bid));
            await tx.wait();
        }
        const tx = await flap.tend(auction.id, parseEther(auction.lot), parseEther(bid));
        await tx.wait();
    }, [bid, auction, address]);
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                            Bid
                        </DialogTitle>
                        <div className="mt-4 flex flex-col gap-4">
                            <div>
                                <div>Dai amount(must be greator than min bid amount)</div>
                                <Input
                                    value={bid}
                                    onChange={e => setBid(e.target.value)}
                                    className="w-full h-[40px] text-black px-2 text-right rounded-md"
                                />
                            </div>
                            <Button
                                className="bg-pink-500/50 w-full h-[40px] rounded-md"
                                onClick={handleBid}
                            >
                                Submit
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default SurplusBidDlg;