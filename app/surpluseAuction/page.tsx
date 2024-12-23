import { urls } from "@/config/urls";
import Link from "next/link";




const AuctionPage = () => {
    return (
        <div className="container flex justify-center py-10 flex-col items-center">
            <div className="flex justify-end w-full">
                <Link className="bg-green-500 px-4 rounded-md py-2" href={urls.createSurpluseAuction}>Create</Link>
            </div>
            <div className="flex flex-col gap-2 lg:w-1/3 w-full">
                
            </div>
        </div>
    );
}

export default AuctionPage;