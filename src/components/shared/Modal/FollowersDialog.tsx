"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle, UserPlus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  label: string
  isFollowing?: boolean
}

interface FollowersDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  type: string
}

// Mock data - replace with your actual data
const mockFollowers: User[] = [
  {
    id: "1",
    name: "Mia Aria Hasan",
    username: "@miaaria",
    avatar: "/userProfile8.png",
    label: "Celebrity",
    isFollowing: false,
  },
  {
    id: "2",
    name: "Mia Aria Hasan",
    username: "@miaaria2",
    avatar: "/userProfile1.png",
    label: "Celebrity",
    isFollowing: false,
  },
  {
    id: "3",
    name: "Mia Aria Hasan",
    username: "@miaaria3",
    avatar: "/userProfile8.png",
    label: "Celebrity",
    isFollowing: true,
  },
  {
    id: "4",
    name: "Mia Aria Hasan",
    username: "@miaaria4",
    avatar: "/userProfile1.png",
    label: "Celebrity",
    isFollowing: false,
  },
  {
    id: "5",
    name: "Mia Aria Hasan",
    username: "@miaaria5",
    avatar: "/userProfile8.png",
    label: "Celebrity",
    isFollowing: true,
  },
]

const mockFollowing: User[] = [
  {
    id: "6",
    name: "John Smith",
    username: "@johnsmith",
    avatar: "/userProfile1.png",
    label: "Celebrity",
    isFollowing: true,
  },
  {
    id: "7",
    name: "Sarah Wilson",
    username: "@sarahw",
    avatar: "/userProfile8.png",
    label: "Artist",
    isFollowing: true,
  },
]

export function FollowersDialog({ open, setOpen, type }: FollowersDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [followers, setFollowers] = useState(mockFollowers);
  const [following, setFollowing] = useState(mockFollowing);

  const handleFollow = (userId: string, isFollowingTab = false) => {
    if (isFollowingTab) {
      setFollowing((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user)),
      )
    } else {
      setFollowers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user)),
      )
    }
  }

  const filterUsers = (users: User[]) => {
    if (!searchQuery) return users
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const UserList = ({ users, isFollowingTab = false }: { users: User[]; isFollowingTab?: boolean }) => (
    <div className="space-y-3">
      {filterUsers(users).map((user) => (
        <div key={user.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg gap-1">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.label}</span>
            </div>
          </div>

          {/* follow btn and message btn for mobile */}
          <div className="flex items-center gap-x-2 md:hidden">
            {/* <Tooltip>
              <TooltipTrigger>
                <Link href="#">
                  <MessageCircle />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Message</p>
              </TooltipContent>
            </Tooltip> */}
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
          </div>

          {/* follow btn and message btn for desktop */}
          <div className="md:flex items-center gap-2 hidden">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs bg-transparent"
              onClick={() => handleFollow(user.id, isFollowingTab)}
            >
              <UserPlus className="h-3 w-3 mr-1" />
              {user.isFollowing ? "UNFOLLOW" : "FOLLOW"}
            </Button>
            {/* <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-transparent">
              <MessageCircle className="h-3 w-3 mr-1" />
              MESSAGE
            </Button> */}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-fit p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-lg font-semibold">Activities</DialogTitle>
        </DialogHeader>

        <div className="px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue={type ? type : "followers"}>
          <TabsList className="grid w-full grid-cols-2 mx-6 mb-4 md:max-w-md max-w-[350px]">
            <TabsTrigger value="followers" className="text-sm data-[state=active]:bg-black data-[state=active]:text-white">
              {followers?.length} Followers
            </TabsTrigger>
            <TabsTrigger value="following" className="text-sm data-[state=active]:bg-black data-[state=active]:text-white">
              {following?.length} Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="px-6 pb-6 mt-0">
            <div className="h-96 overflow-y-auto">
              <UserList users={followers} />
            </div>
          </TabsContent>

          <TabsContent value="following" className="px-6 pb-6 mt-0">
            <div className="h-96 overflow-y-auto">
              <UserList users={following} isFollowingTab={true} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
