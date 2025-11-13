"use client";;
import { MapPin, Check, AlertCircle } from "lucide-react"
import { FacebookIcon, InstagramIcon, TikTokIcon, VerifiedIcon } from "@/icons";
import Link from "next/link";
import { useState } from "react";
import { FollowersDialog } from "../Modal/FollowersDialog";
import Image from "next/image";
import CustomAvatar from "../CustomAvatar";
import webLogo from "@/assets/icons/web-logo.png";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { IndividualCharityDonationFormDialog } from "../Modal/IndividualCharityDonationFormDialog";
import XIcon from "@/assets/icons/x-icon.png";
import { DonationHistory } from "../Modal/Charity/otherUserDonation/DonationHistory";
import { GotCharityDonationHistoryDialog } from "../Modal/Charity/ChariryDonation/GotCharityDonationHistoryDialog";

export default function UserInfoForSmallScreenForCharity({ userRole, coverImage = "/user_profile_cover_image.png", profileImage = "/seller_profile.png", }: { userRole: string, coverImage?: string, profileImage?: string }) {
    const [openFollowers, setOpenFollowers] = useState(false);
    const [openDonationModal, setOpenDonationModal] = useState(false);
    const [openCharityHistory, setOpenCharityHistory] =
        useState(false);
    const [type, setType] = useState("");

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
                        className="rounded-full size-4 flex justify-center items-center absolute md:top-3 top-2 right-0 md:right-2 bg-green-700"

                    >
                        <Check size={14} color="#fff"></Check>
                    </div> */}
                </div>
            </div>

            {/* ====================== charity name and user name ================================ */}
            <div>
                <div className="flex justify-center items-center  gap-x-1 mt-10">
                    <h2 className="text-xl font-semibold text-gray-900 text-center">Save Ocean</h2>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className="rounded-full size-4 flex justify-center items-center "
                                style={{ backgroundColor: "#008236" }}
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

            <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-t-green-700 mt-2">
                {/* Header Buttons */}
                <div className="px-4 pt-4 flex gap-2 bg-white">
                    <button className="flex-1 px-4 py-2 bg-white border border-green-700 text-green-700 rounded font-semibold text-sm hover:bg-gray-50">
                        Follow
                    </button>

                    <button onClick={() => setOpenDonationModal(true)} className="flex-1 px-4 py-2 bg-green-700 text-white rounded font-semibold text-sm hover:bg-green-800">
                        Donate Now
                    </button>
                </div>

                {/* Main Content */}
                <div className="px-4 py-4 space-y-4">
                    {/* Location and Description */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <MapPin size={16} className="text-green-700 flex-shrink-0" />
                            <span>Los Angeles, CA</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <AlertCircle size={16} className="text-green-700 flex-shrink-0" />
                            <span>Supporting Flood Relief Efforts</span>
                        </div>
                    </div>

                    {/* Verification Details */}
                    <div className="grid grid-cols-2 gap-4 py-2 border-y border-gray-200">


                        <div className="flex items-center gap-1 text-green-600 font-medium">
                            <Check size={14} />
                            <span className="text-xs">Verified</span>
                        </div>



                        {/* Social Media */}
                        <div className="flex items-center gap-x-2">
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

                    </div>

                </div>

                {/* Stats Section */}
                <div className="bg-green-700 text-white px-4 py-3">
                    <h3 className="text-center text-xs font-bold tracking-wider">CHARITABLE ORGANIZATION</h3>
                </div>

                {/* Donation Stats */}
                <div className="px-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
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
                    <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-200">


                        <div className="text-center">
                            <div onClick={() => setOpenCharityHistory(!openCharityHistory)} className="flex items-center justify-center gap-1 mb-1">
                                <AlertCircle size={14} className="text-green-700" />
                                <p className="text-xs text-gray-600 font-medium">Total Donations</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">$5,000</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600  text-center">Website</p>
                            <div className="flex items-center justify-center">
                                <Image src={webLogo} alt="web-logo" width={30} height={30} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            <GotCharityDonationHistoryDialog
                open={openCharityHistory}
                setOpen={setOpenCharityHistory}
            />

            <IndividualCharityDonationFormDialog showTrigger={false} open={openDonationModal} setOpen={setOpenDonationModal} />


            <FollowersDialog
                open={openFollowers}
                setOpen={setOpenFollowers}
                type={type}
            />
        </>
    )
}
