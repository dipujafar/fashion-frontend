"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowDownWideNarrow, CalendarDays } from "lucide-react";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import { EaringIcon, EyeIcon, MessageIcon, TotalSaleIcon } from "@/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";

interface SaleItem {
  id: string;
  name: string;
  date: string;
  donation: string;
  amount: string;
  payment_method: string;
}

const donationData: SaleItem[] = [
  {
    id: "1",
    name: "Arisha M",
    date: "Feb 10, 2025",
    donation: "Clothes",
    amount: "N/A",
    payment_method: "N/A",
  },
  {
    id: "2",
    name: "Arisha M",
    date: "Feb 10, 2025",
    donation: "Custom Amount",
    amount: "$100.00",
    payment_method: "PayPal",
  },
  {
    id: "3",
    name: "John D",
    date: "Mar 02, 2025",
    donation: "Books",
    amount: "N/A",
    payment_method: "N/A",
  },
  {
    id: "4",
    name: "Emily R",
    date: "Mar 05, 2025",
    donation: "Custom Amount",
    amount: "$50.00",
    payment_method: "Credit Card",
  },
  {
    id: "5",
    name: "Michael S",
    date: "Apr 12, 2025",
    donation: "Food",
    amount: "N/A",
    payment_method: "N/A",
  },
  {
    id: "6",
    name: "Sarah B",
    date: "Apr 20, 2025",
    donation: "Custom Amount",
    amount: "$75.00",
    payment_method: "Bank Transfer",
  },
  {
    id: "7",
    name: "David K",
    date: "May 01, 2025",
    donation: "Toys",
    amount: "N/A",
    payment_method: "N/A",
  },
  {
    id: "8",
    name: "Laura T",
    date: "May 15, 2025",
    donation: "Custom Amount",
    amount: "$120.00",
    payment_method: "PayPal",
  },
  {
    id: "9",
    name: "Kevin L",
    date: "Jun 10, 2025",
    donation: "Electronics",
    amount: "N/A",
    payment_method: "N/A",
  },
  {
    id: "10",
    name: "Anna G",
    date: "Jul 01, 2025",
    donation: "Custom Amount",
    amount: "$200.00",
    payment_method: "Credit Card",
  },
];

export default function DonationDataTable() {
  const [statusFilter, setStatusFilter] = useState<"Clothes" | "Custom Amount">(
    "Clothes"
  );
  const [date, setDate] = useState<Date | undefined>(new Date());


  const stateData = [
    {
      icon: <EaringIcon />,
      title: "Total Money donation",
      value: "$2,000",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Summary Cards */}

      <Card>
        <CardContent className="flex items-center ">
          <div className="flex items-center space-x-4">
            <div className="size-15 bg-black rounded-full flex items-center justify-center">
              <EaringIcon />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Total Donations Raised
              </p>
              <p className="text-2xl font-bold">$25,000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/*  ----------------------- filter by date -------------------- */}
      <div>
        <Popover>
          <PopoverTrigger className="w-full text-start shadow-lg">
            <div className="p-2 bg-black/5 rounded-lg border flex  justify-between ">
              <p className="text-[#8A8A8A]">Filter by date</p>
              <CalendarDays size={20} color="#8A8A8A" />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className=""
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* <div className="flex justify-end mb-3">
        <Button variant="outline" className="cursor-pointer border-black/60">
          Cancel Product
        </Button>
      </div> */}
      {/* Table Section */}
      <Card className="py-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black  h-[50px]">
                  <TableHead className="text-white font-medium text-center">
                    Name
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Date
                  </TableHead>
                  <TableHead className="text-white font-medium hidden sm:table-cell text-center">
                    <div className="flex justify-center items-center md:space-x-1 ">
                      <span>Donation</span>
                      <Select
                        value={statusFilter}
                        onValueChange={(value) =>
                          setStatusFilter(value as "Clothes" | "Custom Amount")
                        }
                      >
                        <SelectTrigger
                          showIcon={false}
                          className="w-20 h-6 text-xs  text-white border-0"
                        >
                          <ArrowDownWideNarrow color="#fff" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">Clothes</SelectItem>
                          <SelectItem value="Sold">Custom Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Amount
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Payment Method
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donationData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 h-[50px] "
                  >
                    <TableCell className="font-medium text-center">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-center">{item.date}</TableCell>
                    <TableCell className="hidden sm:table-cell text-center">
                      {item.donation}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {item.amount}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {item.payment_method}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <Link  href={'/celebrity/profile-preview'}>
                          <EyeIcon className="cursor-pointer" />
                        </Link>
                        <div>
                          <MessageIcon className="cursor-pointer" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <PaginationSection className="mt-5" />
    </div>
  );
}
