"use client";;
import { Star, MapPin, Check, Dot, AlertCircle } from "lucide-react"
import DisplayLargeDescriptionText from "../DisplayLargeDescriptionText";
import { FacebookIcon, InstagramIcon, TikTokIcon, TwitterIcon, VerifiedIcon } from "@/icons";
import Link from "next/link";
import { useState } from "react";
import { GotCharityDonationHistoryDialog } from "../Modal/Charity/ChariryDonation/GotCharityDonationHistoryDialog";
import { GotCharityStoreDonation } from "../Modal/Charity/CharityStoreDonation/GotCharityStoreDonation";
import { DonationHistory } from "../Modal/Charity/otherUserDonation/DonationHistory";
import { FollowersDialog } from "../Modal/FollowersDialog";
import Image from "next/image";
import CustomAvatar from "../CustomAvatar";
import { Button } from "@/components/ui/button";
import { IndividualCharityDonationFormDialog } from "../Modal/IndividualCharityDonationFormDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import XIcon from "@/assets/icons/x-icon.png";
import ClothesDonationDialog from "../Modal/clothesDonation/ClothesDonationDialog";


export default function UserInfoForSmallScreenForCharityStore({ userRole, coverImage = "/user_profile_cover_image.png", profileImage = "/seller_profile.png", }: { userRole: string, coverImage?: string, profileImage?: string }) {

    const [openCharityHistory, setOpenCharityHistory] = useState(false);
    const [openFollowers, setOpenFollowers] = useState(false);
    const [openDonationHistory, setOpenDonationHistory] = useState(false);
    const [openDonationModal, setOpenDonationModal] = useState(false);
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
                <div className="w-full h-[80px] md:h-[100px] lg:h-[250px] relative overflow-hidden ">
                    <Image
                        src={coverImage}
                        alt="Cover photo"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Profile Picture */}
                <div className="absolute left-1/2 transform -translate-x-1/2 md:-bottom-12 -bottom-10">
                    <CustomAvatar
                        img={profileImage || "/seller_profile.png"}
                        name="Sarah_Style"
                        className="md:size-24  size-20"
                    />

                </div>
            </div>

            {/* ============= follow btn and user tag ================== */}
            <div className="flex justify-between item-center mt-2 px-2">
                <Button size={"sm"} variant={"outline"}>Follow</Button>
                <div style={{ background: "#B59900" }} className="px-3 py-1  rounded text-white text-xs font-medium h-fit">Charity Store</div>
            </div>

            {/* charity store name and  user name */}
            <div className="md:mt-4">
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
                <h6 className="text-center te">@save Ocean</h6>
            </div>



            {/* ============================= profile other information =================== */}
            <div className="w-full  border-gray-300 rounded-lg bg-white lg:mt-20 shadow-md overflow-hidden border-t-4 border-t-green-700 mt-2 px-4 pb-2">

                <div className="px-4 pt-4 pb-2 flex gap-2 bg-white">
                    {/* <button className="flex-1 px-4 py-2 bg-white border border-green-700 text-green-700 rounded font-semibold text-sm hover:bg-gray-50">
                        Donate Clothes
                    </button> */}
                    <ClothesDonationDialog className="flex-1 px-4 py-2 bg-white border border-green-700 text-green-700 rounded font-semibold text-sm hover:bg-gray-50"/>

                    <button onClick={() => setOpenDonationModal(true)} className="flex-1 px-4 py-2 bg-green-700 text-white rounded font-semibold text-sm hover:bg-green-800">
                        Donate Now
                    </button>
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
                <div className="flex justify-center mt-2"> <DisplayLargeDescriptionText length={90} data=" By shopping with us, you're not just getting great items at affordable prices, you're also contributing to the
                fight against ocean pollution and supporting initiatives." />
                </div>
                {/* Message and follow option and Social Media */}
                <div className="flex justify-end items-center gap-x-2 mb-2">
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
                <div className="grid grid-cols-2 gap-4 pt-4 mb-2 ">
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
                        <div onClick={() => handleOpenDonationHistoryModal("charity store")} className="flex items-center justify-center gap-1 mb-1">
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
            <IndividualCharityDonationFormDialog
                showTrigger={false}
                open={openDonationModal}
                setOpen={setOpenDonationModal}
            />

            <FollowersDialog
                open={openFollowers}
                setOpen={setOpenFollowers}
                type={type}
            />
        </>
    )
}
