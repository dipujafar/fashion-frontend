import { Facebook, Instagram, Twitter, Award, Star, MapPin } from "lucide-react"
import DisplayLargeDescriptionText from "../DisplayLargeDescriptionText";

export const userTag = (type: string) => {
    switch (type.toLowerCase()) {
        case "celebrity":
            return {
                label: "Celebrity",
                color: "#123CA6"
            };
        case "eco-friendly store":
            return "#00B047";
        case "charity":
            return "#4B105F";
        case "charity store":
            return "#B59900";
        case "professional seller":
            return "#b91a4f";
        case "ambassador":
            return "#81b91a";
        case "individual seller":
            return "#b96f1a";
        default:
            return "#000";
    }
};

export default function UserInfoForSmallScreen({ userRole }: { userRole: string }) {
    return (
        <div className="w-full p-4 border border-gray-300 rounded-lg bg-white md:mt-20 mt-14">
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
                <DisplayLargeDescriptionText length={80} data=" By shopping with us, you're not just getting great items at affordable prices, you're also contributing to the
                fight against ocean pollution and supporting initiatives." />
            </div>



            {/* Charity Section */}
            <div className="flex items-center justify-between  md:mb-4 mb-2  ">
                <p className="text-xl text-gray-900">Total charity donations</p>
                <p className="text-xl  text-gray-900">$5,000</p>
            </div>


            {/* Badge Section */}
            <div className="flex items-center justify-between md:mb-4 mb-2 p-3 bg-yellow-50 rounded border border-yellow-200">
                <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-700">Sell 10 more items to unlock the next badge!</span>
                </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 md:mb-4 mb-2">
                <a href="#" className="text-blue-600 hover:text-blue-700">
                    <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-600">
                    <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-500">
                    <Twitter className="w-6 h-6" />
                </a>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Followers</p>
                    <p className="text-xl font-bold text-gray-900">2434</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Following</p>
                    <p className="text-xl font-bold text-gray-900">812</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Products</p>
                    <p className="text-xl font-bold text-gray-900">600</p>
                </div>
            </div>
        </div>
    )
}
