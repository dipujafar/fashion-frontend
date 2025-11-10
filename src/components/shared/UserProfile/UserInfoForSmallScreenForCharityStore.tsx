"use client";
import { Star, MapPin, Check, Dot } from "lucide-react"
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
import CommonButton from "@/components/ui/common-button";
import { IndividualCharityDonationFormDialog } from "../Modal/IndividualCharityDonationFormDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


export default function UserInfoForSmallScreenForCharityStore({ userRole, coverImage = "/user_profile_cover_image.png", profileImage = "/seller_profile.png", }: { userRole: string, coverImage?: string, profileImage?: string }) {

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

                </div>
            </div>

            {/* ============= follow btn and user tag ================== */}
            <div className="flex justify-between item-center mt-2 px-2">
                <Button size={"sm"} variant={"outline"}>Follow</Button>
                <div style={{ background: "#B59900" }} className="px-3 py-1  rounded text-white text-xs font-medium h-fit">Charity Store</div>
            </div>



            {/* ============================= profile other information =================== */}
            <div className="w-full  border-gray-300 rounded-lg bg-white md:mt-20 mt-2">
                {/* Header Section */}


                <div className="flex justify-center items-center  gap-x-1">
                    <h2 className="text-xl font-semibold text-gray-900 text-center">Save Ocean</h2>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className="rounded-full size-4 flex justify-center items-center "
                                style={{ backgroundColor: "#B59900" }}
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

                {/* =============================== donate button ==================== */}
                <div className="flex justify-center my-2 gap-x-5 items-center">
                    <CommonButton className=" bg-[#F8FFFB] hover:bg-black/5  text-black border-b-3 border-r-3 border-[#0F3732]">
                        Donate Clothes
                    </CommonButton>
                    <IndividualCharityDonationFormDialog/>
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

                {/*======================= Charity Section ========================== */}
                <div className="flex items-center justify-between  mb-2 text-green-800  ">
                    <p onClick={() => handleOpenDonationHistoryModal("charity store")} className="text-xl  underline cursor-pointer">Total charity donations</p>
                    <p className="text-xl">$5,000</p>
                </div>


                {/* Message and follow option and Social Media */}


                <div className="flex justify-center items-center gap-x-2 mb-1">
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


                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">2434</p>
                        <p onClick={() => setOpenFollowers(true)} className="text-sm text-gray-600  underline cursor-pointer">Followers</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">812</p>
                        <p onClick={() => {
                            setOpenFollowers(true);
                            setType("following");
                        }} className="text-sm text-gray-600 underline cursor-pointer">Following</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">600</p>
                        <p className="text-sm text-gray-600">Total Products</p>
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
