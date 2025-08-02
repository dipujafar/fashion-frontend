"use client";
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
  item: string;
  donated: string;
}

const donationData: SaleItem[] = [
  {
    id: "1",
    name: "Arisha M",
    item: "#A0017",
    donated: "15%",
    date: "Feb 10, 2025",
    amount: "100",
  },
  {
    id: "2",
    name: "Liam R",
    item: "#A0018",
    donated: "20%",
    date: "Feb 11, 2025",
    amount: "150",
  },
  {
    id: "3",
    name: "Olivia B",
    item: "#A0019",
    donated: "10%",
    date: "Feb 12, 2025",
    amount: "90",
  },
  {
    id: "4",
    name: "Noah J",
    item: "#A0020",
    donated: "12%",
    date: "Feb 13, 2025",
    amount: "120",
  },
  {
    id: "5",
    name: "Emma S",
    item: "#A0021",
    donated: "18%",
    date: "Feb 14, 2025",
    amount: "200",
  },
  {
    id: "6",
    name: "James T",
    item: "#A0022",
    donated: "25%",
    date: "Feb 15, 2025",
    amount: "300",
  },
  {
    id: "7",
    name: "Sophia K",
    item: "#A0023",
    donated: "14%",
    date: "Feb 16, 2025",
    amount: "110",
  },
  {
    id: "8",
    name: "Benjamin H",
    item: "#A0024",
    donated: "16%",
    date: "Feb 17, 2025",
    amount: "140",
  },
  {
    id: "9",
    name: "Mia L",
    item: "#A0025",
    donated: "22%",
    date: "Feb 18, 2025",
    amount: "250",
  },
  {
    id: "10",
    name: "William D",
    item: "#A0026",
    donated: "13%",
    date: "Feb 19, 2025",
    amount: "130",
  },
];

export default function SalesContributionsTable() {
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
                    Item Sold
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Donated (%)
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Amount Donated
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Date
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
                    <TableCell className="text-center">{item.item}</TableCell>

                    <TableCell className="font-medium text-center">
                      {item.donated}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      ${item.amount}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {item.date}
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
