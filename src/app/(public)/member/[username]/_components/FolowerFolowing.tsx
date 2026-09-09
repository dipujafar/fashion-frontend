"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Folowings from "./Folowings"
import Folowers from "./Folowers"

interface FollowersDialogProps {
    type: string
    userName: string,
    actionBtn: React.ReactNode
    folowerCount: number
    folowingCount: number
}

export function FolowerFolowing({ type, userName, actionBtn, folowerCount, folowingCount }: FollowersDialogProps) {

    return (

        <Dialog>

            <DialogTrigger asChild className="cursor-pointer">
                {actionBtn}
            </DialogTrigger>

            <DialogContent className="max-w-lg p-0 rounded-none">
                <DialogHeader className="border-b py-3">
                    <DialogTitle className="text-lg font-semibold capitalize text-center">{userName}</DialogTitle>
                </DialogHeader>


                <Tabs defaultValue={type || "followers"}>
                    <div className="border-b border-gray-300">
                        <TabsList className="grid w-full grid-cols-5 rounded-none bg-transparent">
                            <TabsTrigger
                                value="following"
                                className="text-sm bg-transparent rounded-none border-0 cursor-pointer data-[state=active]:border-b-2 pb-2 border-primary-black data-[state=active]:shadow-none focus:outline-none focus-visible:outline-none
focus:ring-0 focus-visible:ring-0">
                                {folowingCount} Following
                            </TabsTrigger>

                            <TabsTrigger
                                value="followers"
                                className="text-sm bg-transparent rounded-none border-0 cursor-pointer data-[state=active]:border-b-2 pb-2 border-primary-black data-[state=active]:shadow-none focus:outline-none focus-visible:outline-none
focus:ring-0 focus-visible:ring-0">
                                {folowerCount} Followers
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="followers" className="px-6 pb-6 mt-0">
                        <Folowers userName={userName} />
                    </TabsContent>

                    <TabsContent value="following" className="px-6 pb-6 mt-0">
                        <Folowings userName={userName} />
                    </TabsContent>
                </Tabs>

            </DialogContent>
        </Dialog>
    )
}

export default FolowerFolowing