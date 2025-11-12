"use client";
import { Star, MapPin, Check, Dot, AlertCircle } from "lucide-react"
import DisplayLargeDescriptionText from "../DisplayLargeDescriptionText";
import {
    FacebookIcon,
    InstagramIcon,
    TikTokIcon,
    TwitterIcon,
    VerifiedIcon,
} from "@/icons";
import Link from "next/link";
import { useState } from "react";
import { GotCharityDonationHistoryDialog } from "../Modal/Charity/ChariryDonation/GotCharityDonationHistoryDialog";
import { GotCharityStoreDonation } from "../Modal/Charity/CharityStoreDonation/GotCharityStoreDonation";
import { DonationHistory } from "../Modal/Charity/otherUserDonation/DonationHistory";
import { FollowersDialog } from "../Modal/FollowersDialog";
import Image from "next/image";
import CustomAvatar from "../CustomAvatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import XIcon from "@/assets/icons/x-icon.png";

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
        case "individual-seller":
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

export default function UserInfoForSmallScreen({ userRole, coverImage = "/user_profile_cover_image.png", profileImage = "/seller_profile.png", }: { userRole: string, coverImage?: string, profileImage?: string }) {

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
            {/* ================= user profile avatar and cover image ================================ */}
            <div className="relative">
                {/* Cover Photo */}
                <div className="w-full h-[80px] md:h-[200px] lg:h-[250px] relative overflow-hidden ">
                    <Image
                        src={coverImage}
                        alt="Cover photo"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Profile Picture */}
                <div className="absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 -bottom-10">
                    <CustomAvatar
                        img={profileImage || "/seller_profile.png"}
                        name="Sarah_Style"
                        className="md:size-36 size-20"
                    />
                    {/* <div
                        className="rounded-full size-4 flex justify-center items-center absolute md:top-3 top-2 right-0 md:right-2"
                        style={{ backgroundColor: userTag(userRole)?.color }}
                    >
                        <Check size={14} color="#fff"></Check>
                    </div> */}
                </div>
            </div>

            {/* ============= follow btn and user tag ================== */}
            <div className="flex justify-between item-center mt-2 px-2">
                <Button size={"sm"} variant={"outline"}>Follow</Button>
                <div style={{ background: userTag(userRole)?.color }} className="px-3 py-1  rounded text-white text-xs font-medium h-fit">{userTag(userRole)?.label}</div>
            </div>



            {/* ============================= profile other information =================== */}
            <div className="w-full  border-gray-300 rounded-lg bg-white md:mt-20 mt-2">
                {/* Header Section */}
                <div>
                    <div className="flex justify-center items-center  gap-x-1">
                        <h2 className="text-xl font-semibold text-gray-900 text-center">Sarah</h2>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    className="rounded-full size-4 flex justify-center items-center "
                                    style={{ backgroundColor: userTag(userRole)?.color }}
                                >
                                    <Check size={14} color="#fff"></Check>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className="flex  flex-wrap items-center text-green-500 ">
                                    <VerifiedIcon />
                                    <span className="text-green-500 font-medium">Verified User</span>
                                </div>

                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <h2 className="text-sm text-gray-900 text-center">@Sarah_Style</h2>
                </div>
                {/* ============== rating and sold item and  location ============= */}
                <div className="flex  justify-center gap-x-2">
                    <div className="flex items-center gap-1 line-clamp-1">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        <p className="md:text-lg font-medium">4.9</p>
                        <p className="md:text-lg text-muted-foreground line-clamp-1">
                            (12 Reviews)
                        </p>
                    </div>
                    <Dot />
                    <h5>500 Sold</h5>
                    <Dot />
                    <div className="flex items-center justify-center gap-1 px-3 py-1 bg-gray-100 rounded border border-gray-300">
                        <MapPin size={14} />
                        <span className="text-xs font-medium text-gray-700">USA</span>
                    </div>

                </div>

                {/* ====================== description ========================== */}
                <div className="flex justify-center mt-2 text-center"> <DisplayLargeDescriptionText length={90} data=" By shopping with us, you're not just getting great items at affordable prices, you're also contributing to the
                fight against ocean pollution and supporting initiatives." />
                </div>

                <div className="flex items-center justify-end  gap-x-2 mb-1">
                    <Link href="#">
                        <FacebookIcon />
                    </Link>
                    <Link href="#">
                        <InstagramIcon />
                    </Link>
                    <Link href="#">
                        <Image
                            src={XIcon}
                            alt="X"
                            className="size-8"
                        ></Image>
                    </Link>
                    <Link href="#">
                        <TikTokIcon />
                    </Link>
                </div>



                {/* ========================= badges ============================= */}
                <div className="flex justify-center items-center gap-x-2">
                    <div className="size-10 bg-black/20 rounded-full flex justify-center items-center">
                        🌱
                    </div>
                    <div className="size-10 bg-black/20 rounded-full flex justify-center items-center">
                        💚
                    </div>
                    <div className="size-10 bg-black/20 rounded-full flex justify-center items-center">
                        👕
                    </div>
                </div>





                {/* Stats Section */}
                <div className="grid grid-cols-2 gap-4 pt-2 mb-2 ">
                    <div className="text-center">
                        <p onClick={() => setOpenFollowers(true)} className="text-sm text-gray-600  underline cursor-pointer">Followers</p>
                        <p className="text-xl font-bold text-gray-900">2434</p>

                    </div>
                    <div className="text-center">
                        <p onClick={() => {
                            setOpenFollowers(true);
                            setType("following");
                        }} className="text-sm text-gray-600 underline cursor-pointer">Following</p>
                        <p className="text-xl font-bold text-gray-900">812</p>

                    </div>

                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                    <div className="text-center">
                        <div onClick={() => handleOpenDonationHistoryModal(userRole)} className="flex items-center justify-center gap-1 mb-1">
                            <AlertCircle size={14} className="text-green-700" />
                            <p className="text-xs text-gray-600 font-medium">Total Donations</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">$5,000</p>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">Total Products</p>
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
