import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { IUser } from '@/types'
import { notFound } from 'next/navigation'
import FolowerListFolowingList from '@/app/(public)/member/[username]/_components/FolowerListFolowingList'
import { Rating } from "@/components/ui/rating";
import moment from 'moment'
import { userRoleMapper } from '@/utils/userRoleMapper'
import Link from 'next/link';
import FolowUnFolow from '@/app/(public)/member/[username]/_components/FolowUnFolow';
import { CharityDonationFormDialog } from '../Modal/Charity/CharityDonationFormDialog';
import { Button } from '@/components/ui/button';

type User = { data: { user: IUser, review: { _avg: { rating: number }, _count: { id: number } }, isfolowing: boolean, totalDonation: number } }


export default async function SellerProfile({ user, isCharity, isCharityShop }: { user: User, isCharity: boolean, isCharityShop: boolean }) {

  const userData = user?.data?.user;

  if (!userData) {
    return notFound()
  }

  return (
    <div className='pt-5'>

      {!isCharity ? <>
        {/* Profile Header Section */}
        <div className='flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-5'>

          <div className='flex flex-col md:flex-row md:items-end gap-y-5 gap-x-0 md:gap-x-16 lg:gap-x-20'>

            <div className="flex flex-row items-center gap-3 md:gap-5">

              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 md:h-28 w-24 md:w-28 shadow-sm">
                  <AvatarImage src={userData?.picture?.url} className='bg-card object-cover ring-4 ring-card shadow' />
                  <AvatarFallback className='text-3xl capitalize font-medium'>{userData?.userName.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>


              {/* Profile Info */}
              <div className="text-left">

                <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-[9px] font-medium uppercase text-white w-auto" style={{ backgroundColor: userRoleMapper(user?.data?.user?.auth?.role)?.color }}>
                  {/* <Sparkles className="h-3 w-3 text-primary" />  */}
                  {userRoleMapper(user?.data?.user?.auth?.role)?.label}
                </span>

                <h1 className="text-2xl md:text-3xl font-bold text-foreground my-0.5 block">
                  {userData?.userName}
                </h1>

                {/* Rating */}
                {user?.data?.review?._count?.id > 0 ? <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-1">
                    <Rating rating={user?.data?.review?._avg?.rating} size={12}></Rating>
                  </div>
                  <span className="text-sm text-gray-600">{user?.data?.review?._count?.id} reviews</span>
                </div> : <p className='mb-1 text-gray-700 text-sm'>No Reviews Yet</p>}

                <p className='text-sm'>Joined {moment(userData?.createdAt).format('MMMM YYYY')}</p>

              </div>

            </div>

            <div className='flex flex-row items-center gap-8 lg:gap-10'>

              <div className=''>
                <FolowerListFolowingList folowers={userData?.followers} folowings={userData?.following} type='following' actionBtn={<div className=''>
                  <p className='font-semibold'>{userData?.following?.length}</p>
                  <p className='text-gray-700'>Following</p>
                </div>} userName={userData?.userName} />
              </div>


              <div className='border-x border-gray-200 px-8 lg:px-10'>
                <FolowerListFolowingList folowers={userData?.followers} folowings={userData?.following} type='followers' actionBtn={<div className=''>
                  <p className='font-semibold'>{userData?.followers?.length}</p>
                  <p className='text-gray-700'>Followers</p>
                </div>} userName={userData?.userName} />
              </div>

              {!(isCharityShop || isCharity) && <Link href={`/member/${userData?.userName}/donations`} className=''>
                <p className='font-semibold'>{user?.data?.totalDonation}</p>
                <p className='text-gray-700'>Donated</p>
              </Link>}

            </div>
          </div>

          <div className="w-full flex flex-col justify-start lg:justify-end items-start lg:items-end gap-y-3">
            <FolowUnFolow isFolow={user?.data?.isfolowing} memberId={userData?.id} />
            {isCharityShop && (
              <div className='lg:w-auto w-full'>
                <CharityDonationFormDialog>
                  <Button className=" text-white font-semibold px-6 cursor-pointer rounded-none w-full md:w-1/2 lg:w-28 bg-green-800 hover:bg-green-700 duration-200 transition-colors">
                    Donate Now
                  </Button>
                </CharityDonationFormDialog>
            </div>)}
          </div>
        </div>

        {/* Bio Section */}
        {
          userData?.bio && <div className="mt-5 md:mt-8 lg:mt-10">
            <p className="text-foreground leading-relaxed md:text-lg max-w-xl">
              {userData?.bio}
            </p>
          </div>
        }
      </> : <div className="">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <div className="relative">
              <Avatar className="h-24 md:h-28 w-24 md:w-28 shadow-sm">
                <AvatarImage src={userData?.picture?.url} className='bg-card object-cover ring-4 ring-card shadow' />
                <AvatarFallback className='text-3xl capitalize font-medium'>{userData?.userName.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <h2 className="font-serif text-3xl tracking-tight md:text-4xl lg:text-5xl mt-1 md:mt-2">
              {user?.data?.user?.fname} {user?.data?.user?.lname}
            </h2>
            <div className='flex flex-row items-center gap-3 mt-1 md:mt-2'>
              <p className='text-base'>@{userData?.userName}</p>
              <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-[9px] font-medium uppercase text-white" style={{ backgroundColor: userRoleMapper(user?.data?.user?.auth?.role)?.color }}>
                {/* <Sparkles className="h-3 w-3 text-primary" />  */}
                {userRoleMapper(user?.data?.user?.auth?.role)?.label}
              </span>
            </div>
            <p className="mt-2 text-sm md:text-base">
              {user?.data?.user?.bio}
            </p>
          </div>

          <div className='md:w-auto w-full'>
            <CharityDonationFormDialog>
              <Button className=" text-white font-semibold px-10 lg:px-20 py-5 lg:py-6 cursor-pointer rounded-none w-full lg:w-28 bg-green-800 hover:bg-green-700 duration-200 transition-colors">
                Donate Now
              </Button>
            </CharityDonationFormDialog>
          </div>

        </div>
      </div>}

    </div>
  )
}
