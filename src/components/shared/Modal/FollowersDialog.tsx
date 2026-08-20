"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import Link from "next/link"
import { IFolow, IUser } from "@/types"
import { userRoleMapper } from "@/utils/userRoleMapper"

interface FollowersDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  type: string
  folowers: IFolow[]
  folowings: IFolow[],
  userName: string
}

export function FollowersDialog({ open, setOpen, type, folowers, folowings, userName }: FollowersDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filterFollowers = (data: IFolow[]) => {
    if (!searchQuery) return data
    return data.filter((item) => {
      const user = item.follower
      return (
        user?.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.fname?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }

  const filterFollowings = (data: IFolow[]) => {
    if (!searchQuery) return data
    return data.filter((item) => {
      const user = item.following
      return (
        user?.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.fname?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }

  const UserRow = ({ user }: { user: IUser }) => (
    <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg gap-1">
      <Link href={`/member/${user?.userName}`} className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.picture?.url} alt={user?.userName} />
          <AvatarFallback>
            {user?.userName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{user?.userName}</span>
          <span className="text-xs text-muted-foreground">{userRoleMapper(user?.auth?.role)?.label}</span>
        </div>
      </Link>

      {/* Mobile */}
      {/* <div className="flex items-center gap-x-2 md:hidden">
        <Tooltip>
          <TooltipTrigger>
            <Link href="#">
              <UserPlus />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Follow</p>
          </TooltipContent>
        </Tooltip>
      </div> */}

      {/* Desktop */}
      {/* <div className="md:flex items-center gap-2 hidden">
        <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-transparent">
          <UserPlus className="h-3 w-3 mr-1" />
          FOLLOW
        </Button>
      </div> */}

    </div>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-fit p-0 rounded-none">
        <DialogHeader className="border-b py-4">
          <DialogTitle className="text-lg font-semibold capitalize text-center">{userName}</DialogTitle>
        </DialogHeader>

        <div className="px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-black !text-base !py-5"
            />
          </div>
        </div>

        <Tabs defaultValue={type || "followers"}>
          <TabsList className="grid w-full grid-cols-2 mx-6 mb-4 md:max-w-md max-w-[350px]">
            <TabsTrigger
              value="followers"
              className="text-sm data-[state=active]:bg-black data-[state=active]:text-white"

            >
              {folowers?.length ?? 0} Followers
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="text-sm data-[state=active]:bg-black data-[state=active]:text-white"

            >
              {folowings?.length ?? 0} Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="px-6 pb-6 mt-0">
            <div className="h-96 overflow-y-auto space-y-3">
              {filterFollowers(folowers ?? []).length > 0 ? (
                filterFollowers(folowers ?? []).map((item) => (
                  <UserRow key={item.followerId} user={item.follower} />
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-8">No followers found</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="following" className="px-6 pb-6 mt-0">
            <div className="h-96 overflow-y-auto space-y-3">
              {filterFollowings(folowings ?? []).length > 0 ? (
                filterFollowings(folowings ?? []).map((item) => (
                  <UserRow key={item.followingId} user={item.following} />
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-8">No following found</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}