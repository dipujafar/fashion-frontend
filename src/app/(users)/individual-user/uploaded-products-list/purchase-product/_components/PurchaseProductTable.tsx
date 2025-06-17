"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ArrowDownWideNarrow, CalendarDays, Search } from "lucide-react";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import { TotalSaleIcon } from "@/icons";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { ReturnRequestModal } from "./ReturnRequestModal";

interface SaleItem {
  id: string;
  itemNumber: string;
  sellerName: string;
  purchaseDate: string;
  purchasePrice: number;
  status: "Delivered" | "Shipping" | "Order Received";
}

const salesData: SaleItem[] = [
  {
    id: "1",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Delivered",
  },
  {
    id: "2",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Shipping",
  },
  {
    id: "3",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Order Received",
  },
  {
    id: "4",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Delivered",
  },
  {
    id: "5",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Shipping",
  },
  {
    id: "6",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Order Received",
  },
  {
    id: "7",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Delivered",
  },
  {
    id: "8",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Shipping",
  },
];

export default function PurchaseProductTable() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [salesItems, setSalesItems] = useState<SaleItem[]>(salesData);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Delivered" | "Shipping" | "Order Received"
  >("All");
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = salesItems.filter(
    (item) => statusFilter === "All" || item.status === statusFilter
  );

  const totalSales = filteredItems.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  return (
    <div>
      {/* ------------------- filter and navigate section ------------------ */}
      <div className="mb-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search here...."
            className="pl-10 bg-black/5 py-5"
          />
        </div>
        <div>
          <Popover>
            <PopoverTrigger className="w-full text-start">
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
        <Link href={"/individual-user/uploaded-products-list/sale"}>
          <div className="p-2 bg-black/5 rounded-lg  ">
            <p className="text-[#8A8A8A]">Sale</p>
          </div>
        </Link>
        <Link href={"/individual-user/uploaded-products-list/purchase-product"}>
          <div className="p-2 bg-black text-white rounded-lg  ">
            <p>Purchase</p>
          </div>
        </Link>
      </div>

      {/* Summary Cards */}

      <Card className="mb-5">
        <CardContent className="flex items-center ">
          <div className="flex items-center space-x-4">
            <div className="size-15 bg-black rounded-full flex items-center justify-center">
              <TotalSaleIcon />
            </div>
            <div>
              <p className="text-lg text-muted-foreground">
                Total Purchase Item
              </p>
              <p className="text-2xl font-bold">{totalSales}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end mb-3">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="cursor-pointer border-black/60"
        >
          Request to return
        </Button>
      </div>
      {/* Table Section */}
      <Card className="py-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black  h-[50px]">
                  <TableHead className="w-12 text-white">
                    <Checkbox
                      checked={
                        selectedItems.length === filteredItems.length &&
                        filteredItems.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                      className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Item Number
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Seller Name
                  </TableHead>
                  <TableHead className="text-white font-medium hidden sm:table-cell text-center">
                    Date Purchased
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Purchase Price
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    <div className="flex justify-center items-center md:space-x-1 ">
                      <span>Status</span>
                      <Select
                        value={statusFilter}
                        onValueChange={(value) =>
                          setStatusFilter(
                            value as
                              | "All"
                              | "Delivered"
                              | "Shipping"
                              | "Order Received"
                          )
                        }
                      >
                        <SelectTrigger
                          showIcon={false}
                          className="w-20 h-6 text-xs  text-white border-0"
                        >
                          <ArrowDownWideNarrow color="#fff" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Shipping">Shipping</SelectItem>
                          <SelectItem value="Order Received">
                            Order Received
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 h-[50px] "
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) =>
                          handleSelectItem(item.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {item.itemNumber}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.sellerName}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center">
                      {item.purchaseDate}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      ${item.purchasePrice.toFixed(2)}
                    </TableCell>
                    <TableCell className=" text-center -translate-x-6">
                      {item.status}
                    </TableCell>
                    <TableCell>
                      {item?.status === "Delivered" && (
                        <Link
                          href={`/individual-user/uploaded-products-list/resell`}
                        >
                          <Button
                            variant="outline"
                            className="cursor-pointer border-black/60"
                            size={"sm"}
                          >
                            Resell
                          </Button>
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <PaginationSection className="mt-5" />

      <ReturnRequestModal open={isOpen} setOpen={setIsOpen} />
    </div>
  );
}
