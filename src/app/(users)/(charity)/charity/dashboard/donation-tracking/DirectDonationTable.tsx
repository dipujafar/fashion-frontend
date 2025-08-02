"use client";;
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import { EyeIcon, MessageIcon } from "@/icons";
import Link from "next/link";

interface SaleItem {
  id: string;
  name: string;
  date: string;
  amount: string;
  payment_method: string;
}

const donationData: SaleItem[] = [
  {
    id: "1",
    name: "Arisha M",
    date: "Feb 10, 2025",
    amount: "100",
    payment_method: "Stripe",
  },
  {
    id: "2",
    name: "Liam R",
    date: "Feb 12, 2025",
    amount: "250",
    payment_method: "PayPal",
  },
  {
    id: "3",
    name: "Noah J",
    date: "Feb 15, 2025",
    amount: "175",
    payment_method: "Stripe",
  },
  {
    id: "4",
    name: "Emma S",
    date: "Feb 18, 2025",
    amount: "300",
    payment_method: "Bank Transfer",
  },
  {
    id: "5",
    name: "Olivia B",
    date: "Feb 20, 2025",
    amount: "90",
    payment_method: "Stripe",
  },
  {
    id: "6",
    name: "William D",
    date: "Feb 22, 2025",
    amount: "120",
    payment_method: "Credit Card",
  },
  {
    id: "7",
    name: "Sophia K",
    date: "Feb 24, 2025",
    amount: "200",
    payment_method: "PayPal",
  },
  {
    id: "8",
    name: "James T",
    date: "Feb 26, 2025",
    amount: "160",
    payment_method: "Stripe",
  },
  {
    id: "9",
    name: "Mia L",
    date: "Feb 28, 2025",
    amount: "140",
    payment_method: "Credit Card",
  },
  {
    id: "10",
    name: "Benjamin H",
    date: "Mar 01, 2025",
    amount: "220",
    payment_method: "Bank Transfer",
  },
];

export default function DirectDonationTable() {
  return (
    <div className="space-y-5">
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

                    <TableCell className="font-medium text-center">
                      ${item.amount}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {item.payment_method}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <Link href={"/users/seller-profile"}>
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
