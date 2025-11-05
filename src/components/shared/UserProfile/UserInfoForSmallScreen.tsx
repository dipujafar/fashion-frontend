"use client";
import { Star, MapPin, MessageCircle, UserPlus } from "lucide-react"
import DisplayLargeDescriptionText from "../DisplayLargeDescriptionText";
import {
    AwardIcon,
    FacebookIcon,
    InstagramIcon,
    TikTokIcon,
    TwitterIcon,
} from "@/icons";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { GotCharityDonationHistoryDialog } from "../Modal/Charity/ChariryDonation/GotCharityDonationHistoryDialog";
import { GotCharityStoreDonation } from "../Modal/Charity/CharityStoreDonation/GotCharityStoreDonation";
import { DonationHistory } from "../Modal/Charity/otherUserDonation/DonationHistory";
import { FollowersDialog } from "../Modal/FollowersDialog";

export const userTag = (type: string) => {
    switch (type.toLowerCase()) {
        case "celebrity":
            return {
                label: "Celebrity",
                color: "#123CA6"
            };
        case "eco-friendly-store":
            return {
                label: "Eco-Friendly Store",
                color: "#00B047"
            };
        case "charity":
            return {
                label: "Charity",
                color: "#4B105F"
            };
        case "charity store":
            return {
                label: "Charity Store",
                color: "#B59900"
            };
        case "professional-seller":
            return {
                label: "Professional Seller",
                color: "#b91a4f"
            };
        case "ambassador":
            return {
                label: "Ambassador",
                color: "#81b91a"
            };
        case "individual seller":
            return {
                label: "Individual Seller",
                color: "#b96f1a"
            };
        default:
            return {
                label: "",
                color: ""
            };
    }
};

export default function UserInfoForSmallScreen({ userRole }: { userRole: string }) {

    const [openCharityHistory, setOpenCharityHistory] = useState(false);
    const [openFollowers, setOpenFollowers] = useState(false);
    const [openDonationHistory, setOpenDonationHistory] = useState(false);
    const [openCharityStoreDonationHistory, setOpenCharityStoreDonationHistory] =
        useState(false);
    const [type, setType] = useState("");

    const handleOpenDonationHistoryModal = (type: string) => {
        if (type === "charity") {
            setOpenDonationHistory(true);
        } else if (type === "charity store") {
            setOpenCharityStoreDonationHistory(true);
        } else {
            setOpenCharityHistory(true);
        }
    };

    return (
        <>

            <div className="w-full p-4 border border-gray-300 rounded-lg bg-white md:mt-20 mt-12">
                {/* Header Section */}
                <div className="flex items-start justify-between md:mb-4 mb-2">
                    <div className="flex gap-4">


                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 ">
                                <h2 className="text-lg font-semibold text-gray-900">@Sarah_Style</h2>
                            </div>
                            <p className="text-sm text-gray-600 flex gap-x-1"><MapPin className="size-4" /> Los Angeles, CA</p>

                            {/* Rating */}
                            <div className="flex items-center gap-1 line-clamp-1">
                                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                <p className="md:text-lg font-medium">4.9</p>
                                <p className="md:text-lg text-muted-foreground line-clamp-1">
                                    (12 Reviews)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Badges */}
                    <div className="flex flex-col gap-2 items-end">
                        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded border border-gray-300">
                            <span className="text-xs font-medium text-gray-700">800 SOLD</span>
                        </div>
                        <div style={{ background: userTag(userRole)?.color }} className="px-3 py-1  rounded text-white text-xs font-medium">{userTag(userRole)?.label}</div>
                    </div>
                </div>

                {/* Description */}
                <div className="text-sm text-gray-600 md:mb-4 mb-2 leading-relaxed">
                    <DisplayLargeDescriptionText length={90} data=" By shopping with us, you're not just getting great items at affordable prices, you're also contributing to the
                fight against ocean pollution and supporting initiatives." />
                </div>



                {/* Charity Section */}
                <div className="flex items-center justify-between  md:mb-4 mb-2  ">
                    <p onClick={() => handleOpenDonationHistoryModal(userRole)} className="text-xl text-gray-600  underline cursor-pointer">Total charity donations</p>
                    <p className="text-xl  text-gray-900">$5,000</p>
                </div>


                {/* Badge Section */}
                {userRole === "celebrity" && (
                    <div className="bg-[#FFFBE6] md:mt-5 mt-2 md:p-2 p-1 rounded-lg flex justify-center items-center mb-2">
                        <AwardIcon />
                        <p className="text-[#8C7600]">Fashion Activist</p>
                    </div>
                )}

                {/* Message and follow option and Social Media */}
                <div className="my-2 flex justify-between gap-x-1.5">
                    <div className="flex items-center gap-x-2">
                        {/* <Tooltip>
                            <TooltipTrigger>
                                <Link href="#">
                                    <MessageCircle />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Message</p>
                            </TooltipContent>
                        </Tooltip> */}
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href="#">
                                    <UserPlus />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Follow</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <Link href="#">
                            <FacebookIcon />
                        </Link>
                        <Link href="#">
                            <InstagramIcon />
                        </Link>
                        <Link href="#">
                            <TwitterIcon />
                        </Link>
                        <Link href="#">
                            <TikTokIcon />
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                        <p onClick={() => setOpenFollowers(true)} className="text-sm text-gray-600 mb-0.5 underline cursor-pointer">Followers</p>
                        <p className="text-xl font-bold text-gray-900">2434</p>
                    </div>
                    <div className="text-center">
                        <p onClick={() => {
                            setOpenFollowers(true);
                            setType("following");
                        }} className="text-sm text-gray-600 mb-0.5 underline cursor-pointer">Following</p>
                        <p className="text-xl font-bold text-gray-900">812</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-0.5">Total Products</p>
                        <p className="text-xl font-bold text-gray-900">600</p>
                    </div>
                </div>
            </div>
            <GotCharityDonationHistoryDialog
                open={openDonationHistory}
                setOpen={setOpenDonationHistory}
            />
            <GotCharityStoreDonation
                open={openCharityStoreDonationHistory}
                onOpenChange={setOpenCharityStoreDonationHistory}
            />

            <DonationHistory
                open={openCharityHistory}
                setOpen={setOpenCharityHistory}
            />

            <FollowersDialog
                open={openFollowers}
                setOpen={setOpenFollowers}
                type={type}
            />
        </>
    )
}
