import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Lock, EyeOff, Eye, UsersRound, Info } from "lucide-react";

const options = [
    {
        icon: EyeOff,
        title: "Yes, keep my donation anonymous",
        text: "Your name will not appear publicly on the charity\u2019s supporter information.",
    },
    {
        icon: Eye,
        title: "No, show my name",
        text: "Your name can appear on the charity\u2019s supporter information.",
    },
];

function DonationPrivacyAbout() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={cn("bg-primary-white py-1.5 px-1.5 flex justify-center items-center gap-x-1 rounded-full cursor-pointer group duration-500 md:text-base text-sm")}>
                    <Info size={16} className="text-gray-600" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="xs:w-sm sm:w-md">
                <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                        <Lock className="h-6 w-6 text-emerald-800" strokeWidth={1.75} />
                    </div>

                    {/* Title */}
                    <h2 className="mt-3 text-lg font-bold text-slate-800">Donation Privacy</h2>
                    <p className="mt-1 text-sm leading-snug text-slate-600">
                        Choose whether your name appears publicly in connection with your
                        donation.
                    </p>

                    {/* Options */}
                    <div className="mt-3 space-y-2">
                        {options.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="flex items-start gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50">
                                    <Icon className="h-4 w-4 text-slate-800" strokeWidth={1.75} />
                                </span>
                                <div>
                                    <p className="font-bold leading-snug text-slate-800">{title}</p>
                                    <p className="mt-0.5 leading-snug text-slate-600 text-sm">
                                        {text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Note */}
                    <div className="mt-3 flex items-center gap-4 border-t border-slate-200 pt-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50">
                            <UsersRound className="h-4 w-4 text-slate-800" strokeWidth={1.75} />
                        </span>
                        <p className="text-sm leading-snug text-slate-600">
                            Your donation amount will still count towards your total raised on
                            your profile, regardless of your privacy selection.
                        </p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DonationPrivacyAbout
