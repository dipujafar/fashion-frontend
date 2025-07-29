"use client";;
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
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowDownWideNarrow } from "lucide-react";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import { EaringIcon, TotalSaleIcon } from "@/icons";
import { ReturnProductModal } from "../../../../app/(users)/individual-user/uploaded-products-list/sale/_components/ReturnProductModal";

interface SaleItem {
  id: string;
  itemNumber: string;
  buyerName: string;
  saleDate: string;
  salePrice: number;
  status: "Sold" | "Returned" | "Ongoing" | "Return Request";
}

const salesData: SaleItem[] = [
  {
    id: "1",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Sold",
  },
  {
    id: "2",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Return Request",
  },
  {
    id: "3",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Returned",
  },
  {
    id: "4",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Ongoing",
  },
  {
    id: "5",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Sold",
  },
  {
    id: "6",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Ongoing",
  },
  {
    id: "7",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Returned",
  },
  {
    id: "8",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Return Request",
  },
];

export default function SaleProductTable({userRole}: {userRole?: string}) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [salesItems, setSalesItems] = useState<SaleItem[]>(salesData);
  const [openRequestModal, setOpenRequestModal] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Sold" | "Return" | "Ongoing"
  >("All");

  const filteredItems = salesItems.filter(
    (item) => statusFilter === "All" || item.status === statusFilter
  );

  const totalSales = filteredItems.length;
  const totalEarnings = filteredItems.reduce(
    (sum, item) => sum + item.salePrice,
    0
  );

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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Sold":
        return "default";
      case "Returned":
        return "destructive";
      case "Ongoing":
        return "secondary";
      case "Return Request":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-4">
        <Card>
          <CardContent className="flex items-center ">
            <div className="flex items-center space-x-4">
              <div className="size-15 bg-black rounded-full flex items-center justify-center">
                <TotalSaleIcon />
              </div>
              <div>
                <p className="text-lg text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">{totalSales}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center ">
            <div className="flex items-center space-x-4">
              <div className="size-15 bg-black rounded-full flex items-center justify-center">
                <EaringIcon />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{userRole !== "charity store" ?"Total Earnings": "Total Fund Rised"}</p>
                <p className="text-2xl font-bold">
                  ${totalEarnings.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
                    Buyer Name
                  </TableHead>
                  <TableHead className="text-white font-medium hidden sm:table-cell text-center">
                    Sale Date
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">
                    Sale Price
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    <div className="flex justify-center items-center md:space-x-1 ">
                      <span>Status</span>
                      <Select
                        value={statusFilter}
                        onValueChange={(value) =>
                          setStatusFilter(
                            value as "All" | "Sold" | "Return" | "Ongoing"
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
                          <SelectItem value="Sold">Sold</SelectItem>
                          <SelectItem value="Returned">Returned</SelectItem>
                          <SelectItem value="Return Request">
                            Return Request
                          </SelectItem>
                          <SelectItem value="Ongoing">Ongoing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableHead>
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
                      {item.buyerName}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center">
                      {item.saleDate}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      ${item.salePrice.toFixed(2)}
                    </TableCell>
                    <TableCell className=" text-center -translate-x-4">
                      {item?.status === "Return Request" ? (
                        <Badge
                          className="cursor-pointer"
                          onClick={() => setOpenRequestModal(true)}
                          variant={getStatusBadgeVariant(item.status)}
                        >
                          {item.status}
                        </Badge>
                      ) : (
                        <Badge variant={getStatusBadgeVariant(item.status)}>
                          {item.status}
                        </Badge>
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
      <ReturnProductModal
        open={openRequestModal}
        setOpen={setOpenRequestModal}
      />
    </div>
  );
}
