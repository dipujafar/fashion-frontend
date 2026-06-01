import {
    MapPin,
    Users,
    Heart,
    DollarSign,
    BadgeCheck,
    Globe,
    UserPlus,
    Clock,
    ImageIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { IUser } from "@/types";
import { userRoleMapper } from "@/utils/userRoleMapper";
import FolowUnFolow from "./FolowUnFolow";
import { Button } from "@/components/ui/button";
import { notFound } from 'next/navigation'
import Link from "next/link";
import { CharityDonationFormDialog } from "@/components/shared/Modal/Charity/CharityDonationFormDialog";
import FolowerListFolowingList from "./FolowerListFolowingList";
import moment from "moment";
import Image from "next/image";

// const gallery = [
//   { src: g1, caption: "Reforestation drive — 2,400 trees planted" },
//   { src: g2, caption: "Coastal cleanup — 3 tons of debris removed" },
//   { src: g3, caption: "Solar microgrids for rural villages" },
//   { src: g4, caption: "Seedlings for the next generation" },
// ];

async function CharityProfile({ userPromise }: { userPromise: Promise<{ data: { user: IUser, review: { _avg: { rating: number }, _count: { id: number } }, isfolowing: boolean } }> }) {

    const user = await userPromise;

    const userData = user?.data?.user;

    if (!userData) {
        return notFound()
    }

    return (

        <div className="mt-5">
            {/* Header */}
            <section className="grid gap-5 lg:gap-10 md:grid-cols-[auto_1fr] md:items-center">

                <div className="relative mx-auto md:mx-0">
                    <Avatar className="h-36 w-36 flex-shrink-0 shadow-sm">
                        <AvatarImage src={userData?.picture?.url} className='bg-card object-cover ring-4 ring-card shadow' />
                        <AvatarFallback className='text-3xl capitalize font-medium'>{userData?.userName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground ring-4 ring-background">
                        <BadgeCheck className="h-5 w-5" />
                    </span>
                </div>

                <div className="text-center md:text-left">
                    <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-white" style={{ backgroundColor: userRoleMapper(user?.data?.user?.auth?.role)?.color }}>
                        {/* <Sparkles className="h-3 w-3 text-primary" />  */}
                        {userRoleMapper(user?.data?.user?.auth?.role)?.label}
                    </span>

                    <h1
                        className="text-3xl md:text-4xl font-semibold text-foreground mt-2">
                        {userData?.fname} {userData?.lname}
                    </h1>

                    {/* <p className="mt-2 text-base text-foreground md:text-lg">
                        "Small acts. Living planet."
                    </p> */}

                    {
                        userData?.bio && <p className="mt-2 text-base text-foreground md:text-lg">
                            {userData?.bio}
                        </p>
                    }

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">


                        <CharityDonationFormDialog>
                            <Button
                                className="inline-flex items-center gap-2 rounded-full !px-5 text-sm font-semibold text-primary-foreground bg-green-700 hover:bg-green-700/80 duration-200 transition-colors cursor-pointer"
                            >
                                <Heart className="h-4 w-4 fill-current" /> Donate now
                            </Button>
                        </CharityDonationFormDialog>

                        <FolowUnFolow isFolow={user?.data?.isfolowing} memberId={user?.data?.user?.id} />
                    </div>
                </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8 mt-8">

                {/* About Section */}
                <div className="space-y-2 lg:space-y-2.5">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">OVERVIEW:</h2>

                    <div className="space-y-2.5 lg:space-y-3">
                        <div className="flex gap-3 items-start">
                            <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <p className="text-foreground font-medium">
                                {[userData?.city, userData?.state, userData?.country]
                                    .filter(Boolean)
                                    .join(", ")}
                            </p>
                        </div>

                        <div className="flex gap-3 items-start">
                            <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <p className="text-foreground font-medium">
                                Member since, {moment(userData?.createdAt).format('MMMM YYYY')}
                            </p>
                        </div>

                        <div className="flex gap-3 items-start">
                            <Globe className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <Link href={userData?.website || "#"} target="_blank" className="text-foreground font-medium">
                                {userData?.website || "N/A"}
                            </Link>
                        </div>

                        <div className="flex gap-3 items-start">
                            <Users className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <FolowerListFolowingList folowers={userData?.followers} folowings={userData?.following} />
                        </div>
                    </div>
                </div>
            </div>

            {/* =============Charity Stats and Gallery can be added here======================== */}

        </div>
    );
}

export default CharityProfile;
