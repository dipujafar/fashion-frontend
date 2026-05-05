import { Star, MapPin, Clock, Users, } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Container from '../Container'
import { IUser } from '@/types'
import { notFound } from 'next/navigation'
import FolowUnFolow from '@/app/(public)/member/[username]/_components/FolowUnFolow'
import FolowerListFolowingList from '@/app/(public)/member/[username]/_components/FolowerListFolowingList'
import { Rating } from "@/components/ui/rating";

export default async function SellerProfile({ userPromise }: { userPromise: Promise<{ data: { user: IUser, review: { _avg: { rating: number }, _count: { id: number } }, isfolowing: boolean } }> }) {

  const user = await userPromise;

  const userData = user?.data?.user;

  if (!userData) {
    return notFound()
  }

  return (
    <>

      {/* Profile Header Section */}
      <div className="flex gap-6 md:gap-8 items-start mt-5">
        {/* Avatar */}
        <Avatar className="h-32 w-32 md:h-40 md:w-40 flex-shrink-0 shadow-sm">
          <AvatarImage src={userData?.picture?.url} />
          <AvatarFallback className='text-3xl'>{userData?.userName.slice(0, 2)}</AvatarFallback>
        </Avatar>

        {/* Profile Info */}
        <div className="flex-1 pt-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {userData?.userName}
          </h1>

          {/* Rating */}
          {user?.data?.review?._count?.id > 0 ? <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1">
              <Rating rating={user?.data?.review?._avg?.rating} size={15}></Rating>
            </div>
            <span className="text-base text-muted-foreground font-medium">{user?.data?.review?._count?.id} reviews</span>
          </div> : <p className='mb-3 text-gray-700'>No Reviews Yet</p>}

          <FolowUnFolow isFolow={user?.data?.isfolowing} memberId={userData?.id} />

        </div>
      </div>

      {/* Bio Section */}
      {
        userData?.description && <div className="bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl p-6">
          <p className="text-foreground leading-relaxed">
            {userData?.description}
          </p>
        </div>
      }

      {/* Two Column Info Grid */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* About Section */}
        <div className="space-y-3 lg:space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">About:</h2>

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
              <p className="text-foreground font-medium">Last seen 1 hour ago</p>
            </div>

            <div className="flex gap-3 items-start">
              <Users className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <FolowerListFolowingList folowers={userData?.followers} folowings={userData?.following} />
            </div>
          </div>
        </div>

      </div>

    </>
  )
}
