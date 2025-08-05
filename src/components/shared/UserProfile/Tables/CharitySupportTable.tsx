"use client";
import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CharityData {
  id: string;
  charityName: string;
  date: string;
  amount: string;
  percentage: string;
}

const mockData: CharityData[] = [
  {
    id: "1",
    charityName: "Save The Ocean",
    date: "Feb 10, 2025",
    amount: "15%",
    percentage: "15%",
  },
  {
    id: "2",
    charityName: "Save The Ocean",
    date: "Feb 10, 2025",
    amount: "15%",
    percentage: "15%",
  },
  {
    id: "3",
    charityName: "Save The Ocean",
    date: "Feb 10, 2025",
    amount: "15%",
    percentage: "15%",
  },
  {
    id: "4",
    charityName: "Save The Ocean",
    date: "Feb 10, 2025",
    amount: "15%",
    percentage: "15%",
  },
  {
    id: "5",
    charityName: "Save The Ocean",
    date: "Feb 10, 2025",
    amount: "15%",
    percentage: "15%",
  },
  {
    id: "6",
    charityName: "Save The Ocean",
    date: "Feb 10, 2025",
    amount: "15%",
    percentage: "15%",
  },
  {
    id: "7",
    charityName: "Save The Ocean",
    date: "Feb 10, 2025",
    amount: "15%",
    percentage: "15%",
  },
  {
    id: "8",
    charityName: "Save The Ocean",
    date: "Feb 10, 2025",
    amount: "15%",
    percentage: "15%",
  },
];

export default function CharitySupportTable() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}

      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search charity"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-black/5"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg ">
        <Table>
          <TableHeader>
            <TableRow className="bg-black hover:bg-black rounded-lg">
              <TableHead className="w-12 text-white"></TableHead>
              <TableHead className="text-white font-medium text-center">
                Charity Name
              </TableHead>
              <TableHead className="text-white font-medium text-center">
                Date
              </TableHead>

              <TableHead className="text-white font-medium text-center">
                Amount Percentage
              </TableHead>
              <TableHead className="text-white font-medium text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((item, index) => (
              <TableRow
                key={item.id}
                className={
                  index % 2 === 0
                    ? "bg-white text-center"
                    : "bg-gray-50 text-center"
                }
              >
                <TableCell></TableCell>
                <TableCell className="font-medium">
                  {item.charityName}
                </TableCell>
                <TableCell>{item.date}</TableCell>

                <TableCell>{item.percentage}</TableCell>
                <TableCell className="text-center">
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <p className="text-sm">
                        Are you sure you want to delete this charity?
                      </p>
                      <div className="flex justify-end mt-1">
                        <Button size={"sm"}>Delete</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationSection />
      </div>
    </div>
  );
}
