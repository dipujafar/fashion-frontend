import { usePayoutsQuery } from '@/redux/api/userApi'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import moment from 'moment';
import React from 'react'
import { Pagination } from 'react-pagination-bar';

function Payouts() {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isError } = usePayoutsQuery({ page }, { refetchOnMountOrArgChange: true });

  if (isLoading) {
    return <div className="flex-center h-28 lg:h-40">
      <span className="loaderDark !w-10"> </span>
    </div>
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm font-medium text-black">Payouts</p>
      </div>

      {
        data?.data?.data?.map((payout, i) => (
          <div key={payout?.id} className="flex items-center justify-between border-b border-black/10 py-3.5 last:border-0">
            <div>
              <p className="text-sm font-medium text-black">Withdrawal</p>
              <p className="text-xs text-black/70">{moment(payout?.createdAt).format('MMM D, YYYY h:mm A')}</p>
            </div>
            <p className="text-sm font-semibold tabular-nums text-black">
              ${payout?.amount.toFixed(2)}
            </p>
          </div>
        ))
      }

      {
        data?.data?.data?.length === 0 && <div className="flex-center h-28 lg:h-40">
          <p className="text-sm text-black/70">No payouts found.</p>
        </div>
      }

      <center>
        < Pagination
          currentPage={page}
          itemsPerPage={10}
          onPageChange={(pageNumber) => setPage(pageNumber)}
          totalItems={data?.data?.meta?.total || 0}
          pageNeighbours={1}
          startLabel={null}
          prevLabel={<ChevronLeft className="size-3" />}
          nextLabel={<ChevronRight className="size-3" />}
          onlyPageNumbers={true}
          endLabel={null}
          customClassNames={
            {
              rpbItemClassName: "rounded px-2 h-6 cursor-pointer border border-gray-200 ml-1.5 text-sm",
              rpbItemClassNameActive: "border-none bg-primary-black text-white",
            }
          }
        />
      </center>

    </div>
  )
}

export default Payouts