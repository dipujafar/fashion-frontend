import { productData } from "@/app/(public)/wishlist/_components/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    MenubarContent,
    MenubarItem,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import userImage from "@/assets/images/message/user1.png"

export default function MessageDropDown() {
    return (
        
        <>
        
            <MenubarTrigger className="px-1">
                <Mail className="size-[20px] lg:size-[24px]" color="#212121" />
            </MenubarTrigger>
            <MenubarContent className="md:min-w-sm">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index}>
                        <MenubarItem className="cursor-pointer">
                            <Link href={"/individual-user/dashboard/message"} className="w-full">
                                <Card className="p-4 hover:shadow-md transition-shadow w-full">
                                    <div className="flex items-start gap-3">
                                        <Image
                                            src={userImage}
                                            alt={"user image"}
                                            width={1200}
                                            height={1200}
                                            className="w-12 h-12 rounded-md object-cover"
                                        />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-lg break-words">
                                                        Elmer Laverty
                                                    </p>
                                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                                        Emily: Yes, You can make an offer of ...
                                                    </span>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </Card>
                            </Link>
                        </MenubarItem>
                    </div>
                ))}
                <Link href={"/individual-user/dashboard/message"}>
                    <Button className="w-full mt-2">View All</Button>
                </Link>
            </MenubarContent>
        </>
    );
}
