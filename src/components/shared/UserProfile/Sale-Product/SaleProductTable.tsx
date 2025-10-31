"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowDownWideNarrow } from "lucide-react"
import PaginationSection from "@/components/shared/Pagination/PaginationSection"
import { ReturnProductModal } from "../Modals/ReturnProductModal"
import Link from "next/link"
import Image from "next/image"

interface SaleItem {
  id: string
  itemNumber: string
  buyerName: string
  saleDate: string
  salePrice: number
  status: "Sold" | "Returned" | "Ongoing" | "Return Request"
  image: string
  title: string
}

const salesData: SaleItem[] = [
  {
    id: "1",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Sold",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "2",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Return Request",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "3",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Returned",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "4",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Ongoing",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "5",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Sold",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "6",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Ongoing",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "7",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Returned",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "8",
    itemNumber: "#A001",
    buyerName: "Alice M",
    saleDate: "Feb 10, 2025",
    salePrice: 35.0,
    status: "Return Request",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
]

export default function SaleProductTable({ userRole }: { userRole?: string }) {
  const [salesItems, setSalesItems] = useState<SaleItem[]>(salesData)
  const [openRequestModal, setOpenRequestModal] = useState<boolean>(false)
  const [statusFilter, setStatusFilter] = useState<"All" | "Sold" | "Return" | "Ongoing">("All")

  const filteredItems = salesItems.filter((item) => statusFilter === "All" || item.status === statusFilter)

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Sold":
        return "default"
      case "Returned":
        return "destructive"
      case "Ongoing":
        return "secondary"
      case "Return Request":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div>
      <div className="md:hidden mb-4 flex items-center gap-2">
        <span className="text-sm font-medium">Filter:</span>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as "All" | "Sold" | "Return" | "Ongoing")}
        >
          <SelectTrigger className="w-32 h-9 text-xs">
            <ArrowDownWideNarrow size={16} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Sold">Sold</SelectItem>
            <SelectItem value="Returned">Returned</SelectItem>
            <SelectItem value="Return Request">Return Request</SelectItem>
            <SelectItem value="Ongoing">Ongoing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="hidden md:block py-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black h-[50px]">
                  <TableHead className="text-white font-medium text-center">Item Number</TableHead>
                  <TableHead className="text-white font-medium">Product</TableHead>
                  <TableHead className="text-white font-medium text-center">Buyer Name</TableHead>
                  <TableHead className="text-white font-medium text-center">Size</TableHead>
                  <TableHead className="text-white font-medium text-center">Condition</TableHead>
                  <TableHead className="text-white font-medium text-center">Sale Price</TableHead>
                  <TableHead className="text-white font-medium hidden sm:table-cell text-center">Sale Date</TableHead>
                  <TableHead className="text-white font-medium">
                    <div className="flex justify-center items-center md:space-x-1">
                      <span>Status</span>
                      <Select
                        value={statusFilter}
                        onValueChange={(value) => setStatusFilter(value as "All" | "Sold" | "Return" | "Ongoing")}
                      >
                        <SelectTrigger showIcon={false} className="w-20 h-6 text-xs text-white border-0">
                          <ArrowDownWideNarrow color="#fff" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          <SelectItem value="Sold">Sold</SelectItem>
                          <SelectItem value="Returned">Returned</SelectItem>
                          <SelectItem value="Return Request">Return Request</SelectItem>
                          <SelectItem value="Ongoing">Ongoing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50 h-[50px]">
                    <TableCell className="font-medium text-center">
                      <Link href={`/shop/2`} className="underline">
                        {item.itemNumber}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-x-2">
                        <div className="w-12 h-12 relative rounded overflow-hidden">
                          <Link href={`/shop/2`} className="text-base">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </Link>
                        </div>
                        <Link href={`/shop/2`} className="text-base">
                          {item.title}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{item.buyerName}</TableCell>
                    <TableCell className="text-center">UK 10</TableCell>
                    <TableCell className="text-center">2 months used</TableCell>
                    <TableCell className="font-medium text-center">${item.salePrice.toFixed(2)}</TableCell>
                    <TableCell className="hidden sm:table-cell text-center">{item.saleDate}</TableCell>
                    <TableCell className="text-center -translate-x-4">
                      {item?.status === "Return Request" ? (
                        <Badge
                          className="cursor-pointer"
                          onClick={() => setOpenRequestModal(true)}
                          variant={getStatusBadgeVariant(item.status)}
                        >
                          {item.status}
                        </Badge>
                      ) : (
                        <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="md:hidden space-y-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                  <Link href={`/shop/2`}>
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </Link>
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/shop/2`} className="font-semibold text-sm hover:underline block truncate">
                    {item.title}
                  </Link>
                  <p className="text-xs text-gray-600 mt-1">
                    Item: <span className="font-medium">{item.itemNumber}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">${item.salePrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-600">Buyer</p>
                  <p className="font-medium">{item.buyerName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Size</p>
                  <p className="font-medium">UK 10</p>
                </div>
                <div>
                  <p className="text-gray-600">Condition</p>
                  <p className="font-medium">2 months used</p>
                </div>
                <div>
                  <p className="text-gray-600">Sale Date</p>
                  <p className="font-medium">{item.saleDate}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                {item?.status === "Return Request" ? (
                  <Badge
                    className="cursor-pointer w-full justify-center"
                    onClick={() => setOpenRequestModal(true)}
                    variant={getStatusBadgeVariant(item.status)}
                  >
                    {item.status}
                  </Badge>
                ) : (
                  <Badge variant={getStatusBadgeVariant(item.status)} className="w-full justify-center">
                    {item.status}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <PaginationSection className="mt-5" />
      <ReturnProductModal open={openRequestModal} setOpen={setOpenRequestModal} />
    </div>
  )
}
