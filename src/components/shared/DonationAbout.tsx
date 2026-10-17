import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { HandHeart, Info, Lightbulb, UsersRound, FileText, Heart } from "lucide-react"

const steps = [
    "Select a donation percentage between 5% and 100%.",
    "Choose up to three charities.",
    "If you select more than one charity, your donation will be automatically divided equally between them.",
    "The donation will be deducted from your sale proceeds once the item is sold.",
];

function DonationAbout() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={cn("bg-primary-white py-1.5 px-1.5 flex justify-center items-center gap-x-1 rounded-full cursor-pointer group duration-500 md:text-base text-sm")}>
                    <Info size={16} className="text-gray-600" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-md">
                <div>
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                            <HandHeart className="h-6 w-6 text-emerald-800" strokeWidth={1.75} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">
                                How Charity Donations Work
                            </h2>
                            <p className="mt-0.5 text-sm leading-snug text-slate-600">
                                Choose a percentage of your item&rsquo;s selling price to donate to
                                charity (minimum 5%). You can select up to three charities.
                            </p>
                        </div>
                    </div>

                    {/* Steps */}
                    <ol className="mt-3 space-y-2">
                        {steps.map((text, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-base font-semibold text-slate-800">
                                    {i + 1}
                                </span>
                                <p className="pt-0.5 text-sm leading-snug text-slate-700">
                                    {text}
                                </p>
                            </li>
                        ))}
                    </ol>

                    {/* Example */}
                    <div className="mt-3 flex items-start gap-3 rounded-md bg-emerald-50 p-2">
                        <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-emerald-700"
                            strokeWidth={1.75}
                        />
                        <div>
                            <p className="font-bold text-slate-800">Example</p>
                            <p className="mt-0.5 text-sm leading-snug text-slate-600">
                                If you sell an item for £100 and pledge 20%, £20 will go to charity
                                (£10 to each charity if you select two).
                            </p>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DonationAbout;


const points = [
    {
        icon: UsersRound,
        text: "The donation is automatically shared equally between the seller\u2019s selected charities.",
    },
    {
        icon: FileText,
        text: "You can view the charities and learn more about them.",
    },
    {
        icon: Heart,
        text: "You\u2019ll also have the option to make an additional donation at checkout (optional).",
    },
];

export function ProductDonationAbout({ percentage }: { percentage: number }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={cn("bg-primary-white py-1.5 px-1.5 flex justify-center items-center gap-x-1 rounded-full cursor-pointer group duration-500 md:text-base text-sm")}>
                    <Info size={16} className="text-gray-600" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-md">
                <div className="p-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                        <HandHeart className="h-6 w-6 text-emerald-800" strokeWidth={1.75} />
                    </div>

                    {/* Title */}
                    <h2 className="mt-3 text-base font-bold text-slate-900">
                        Your Purchase Makes a Difference
                    </h2>
                    <p className="mt-1 text-sm leading-snug text-slate-600">
                        The seller has pledged{" "}
                        <span className="font-bold text-sm text-slate-800">{percentage}%</span> of this
                        item&rsquo;s selling price to charity, and your purchase makes this
                        contribution possible.
                    </p>

                    {/* Points */}
                    <ul className="mt-3 space-y-3 border-t border-slate-200 pt-3">
                        {points.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-start gap-4">
                                <Icon
                                    className="mt-0.5 h-4 w-4 shrink-0 text-slate-800"
                                    strokeWidth={1.75}
                                />
                                <p className="text-sm leading-snug text-slate-600">{text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </PopoverContent>
        </Popover>
    )
}