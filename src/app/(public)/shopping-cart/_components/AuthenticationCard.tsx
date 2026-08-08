"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"
import { updateAuthenticationCostCheckout } from "@/lib/Actions/Cart.action";
import { ShieldCheck } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import React from "react";
import { toast } from "sonner";

function AuthenticationCard({ checked, cartGroupId }: { checked?: boolean; cartGroupId: string }) {

    const handleToggle = async (checked: boolean) => {
        try {
            const res = await updateAuthenticationCostCheckout({ allowAuthentication: checked, cartGroupId });
            if (res?.error) {
                toast.error(res?.error || "Something went wrong, try again");
            }
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error; // Let Next.js handle the redirect
            }
            toast.error(error?.data?.message || "Something went wrong, try again");
        }

    }

    return (
        <Card className=" hover:border hover:border-primary-color/50 duration-300 text-black h-fit rounded-none gap-3">
            <CardHeader className="mb-0">
                <CardTitle className="font-semibold text-lg flex flex-row items-center gap-2">
                    <ShieldCheck />
                    Authentication & Quality Control
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                    Physical inspection by our experts before delivery.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">

                <div className="flex flex-row justify-between items-center">

                    <p className="font-semibold text-xl">+$15.00</p>

                    <Switch
                        id="authentication"
                        // defaultChecked
                        className="h-6 w-12 [&>span]:h-5 [&>span]:w-5 [&>span]:data-[state=checked]:translate-x-[25px]"
                        defaultChecked={checked}
                        onCheckedChange={handleToggle}
                    />
                </div>

            </CardContent>

        </Card>
    )
}

export default AuthenticationCard