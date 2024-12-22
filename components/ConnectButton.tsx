"use client"
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import truncateEthAddress from 'truncate-eth-address';

export default function ConnectButton() {
    // 4. Use modal hook
    const { open } = useAppKit()
    const { address } = useAppKitAccount();

    return (
        <>
            <button
                onClick={() => open()}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
                {
                    address ?
                        <div>
                            {truncateEthAddress(address)}
                        </div>
                        :
                        <div>Connect Wallet</div>
                }
            </button>
            {/* <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button> */}
        </>
    )
}