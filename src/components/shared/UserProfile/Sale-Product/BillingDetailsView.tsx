import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, User, Phone, Mail, Globe } from "lucide-react"
import { IBillingDetails } from "@/types"


interface ShippingDetailsModalProps {
    billingDetails?: IBillingDetails | null

    trigger: React.ReactNode
}

function DetailRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value?: string | null
}) {
    if (!value) return <></>
    return (
        <div className="flex items-start gap-x-3 py-2">
            <div className="mt-0.5 text-muted-foreground">{icon}</div>
            <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{value}</span>
            </div>
        </div>
    )
}

function BillingDetailsView({
    billingDetails: data,
    trigger,
}: ShippingDetailsModalProps) {

    return (
        <Dialog>
            <DialogTrigger asChild={typeof trigger !== "string"} className="cursor-pointer text-left">
                {trigger}
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-x-2">
                        <MapPin size={18} />
                        Shipping Details
                    </DialogTitle>
                    <DialogDescription>
                        Delivery address and contact information for this order.
                    </DialogDescription>
                </DialogHeader>


                <div className="divide-y">
                    <DetailRow
                        icon={<User size={16} />}
                        label="Full Name"
                        value={data?.full_name}
                    />
                    <DetailRow
                        icon={<Mail size={16} />}
                        label="Email"
                        value={data?.email}
                    />
                    <DetailRow
                        icon={<Phone size={16} />}
                        label="Contact"
                        value={data?.contact}
                    />
                    <DetailRow
                        icon={<MapPin size={16} />}
                        label="Address 1"
                        value={data?.address1}
                    />
                    <DetailRow
                        icon={<MapPin size={16} />}
                        label="Address 2"
                        value={data?.address2}
                    />
                    <DetailRow
                        icon={<MapPin size={16} />}
                        label="City"
                        value={data?.city}
                    />
                    <DetailRow
                        icon={<MapPin size={16} />}
                        label="State"
                        value={data?.state}
                    />
                    <DetailRow
                        icon={<MapPin size={16} />}
                        label="Zip Code"
                        value={data?.zip_code}
                    />
                    <DetailRow
                        icon={<Globe size={16} />}
                        label="Country"
                        value={data?.country}
                    />
                </div>

            </DialogContent>
        </Dialog>
    )
}
export default BillingDetailsView