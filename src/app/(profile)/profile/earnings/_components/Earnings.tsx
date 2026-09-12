import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useGetSellsEarningsQuery } from '@/redux/api/earning.api';
import { EarningStatus } from '@/utils/EnumFormater';
import moment from 'moment';
import Link from 'next/link';
import React from 'react'

export function SellerEarningPanel() {
  const [page, setPage] = React.useState(1);
  const { isLoading, data } = useGetSellsEarningsQuery({ page }, { refetchOnMountOrArgChange: true });

  if (isLoading) {
    return <div className="flex-center h-28 lg:h-40">
      <span className="loaderDark !w-10"> </span>
    </div>
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm font-medium text-black">Listing Sell Earnings</p>
      </div>

      <div>
        {data?.data?.data?.map((order, i) => (
          <div className="flex items-center justify-between border-b border-black/10 py-3.5 last:border-0">
            <div className='flex flex-row gap-x-2 items-center'>

              <Link href={`/member/${order?.buyer?.userName}`} >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage
                    src={order?.buyer?.picture?.url}
                    alt={order?.buyer?.userName}
                  />
                  <AvatarFallback>
                    {order?.buyer?.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div>
                <p className="text-sm font-medium text-black">Order {order?.orderNumber}</p>
                <p className="text-xs text-black/80">{moment(order?.createdAt).format('MMM DD, YYYY')} {order?.payment && <Badge
                  variant={"outline"}
                  className={cn(EarningStatus(order?.payment?.stripe_status)?.color)}
                >
                  {EarningStatus(order?.payment?.stripe_status)?.label}
                </Badge>} </p>
              </div>
            </div>
            <p className="text-xl font-semibold tabular-nums text-black">
              ${order?.sellerTotal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}