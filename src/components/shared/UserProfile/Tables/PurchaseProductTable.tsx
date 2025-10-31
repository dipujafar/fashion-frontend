"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { ArrowDownWideNarrow } from "lucide-react"
import { ReturnRequestModal } from "../Modals/ReturnRequestModal"
import Link from "next/link"
import Image from "next/image"
import PaginationSection from "../../Pagination/PaginationSection"

interface SaleItem {
  id: string
  itemNumber: string
  sellerName: string
  purchaseDate: string
  purchasePrice: number
  status: "Delivered" | "Shipping" | "Order Received"
  image: string
  title: string
}

const salesData: SaleItem[] = [
  {
    id: "1",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Delivered",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "2",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Shipping",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "3",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Order Received",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "4",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Delivered",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "5",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Shipping",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "6",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Order Received",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "7",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Delivered",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
  {
    id: "8",
    itemNumber: "#A001",
    sellerName: "Alice M",
    purchaseDate: "Feb 10, 2025",
    purchasePrice: 35.0,
    status: "Shipping",
    image: "/product_image_3.jpg",
    title: "Tops Shirt",
  },
]

export default function PurchaseProductTable() {
  const [salesItems, setSalesItems] = useState<SaleItem[]>(salesData)
  const [statusFilter, setStatusFilter] = useState<"All" | "Delivered" | "Shipping" | "Order Received">("All")
  const [isOpen, setIsOpen] = useState(false)

  const filteredItems = salesItems.filter((item) => statusFilter === "All" || item.status === statusFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600"
      case "Shipping":
        return "text-blue-600"
      case "Order Received":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div>
      <Card className="py-0 hidden md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black h-[50px]">
                  <TableHead className="text-white font-medium text-center">Item Number</TableHead>
                  <TableHead className="text-white font-medium">Product</TableHead>
                  <TableHead className="text-white font-medium text-center">Seller Name</TableHead>
                  <TableHead className="text-white font-medium text-center">Size</TableHead>
                  <TableHead className="text-white font-medium text-center">Condition</TableHead>
                  <TableHead className="text-white font-medium text-center">Purchase Price</TableHead>
                  <TableHead className="text-white font-medium text-center">Date Purchased</TableHead>
                  <TableHead className="text-white font-medium">
                    <div className="flex justify-center items-center md:space-x-1">
                      <span>Status</span>
                      <Select
                        value={statusFilter}
                        onValueChange={(value) =>
                          setStatusFilter(value as "All" | "Delivered" | "Shipping" | "Order Received")
                        }
                      >
                        <SelectTrigger showIcon={false} className="w-20 h-6 text-xs text-white border-0">
                          <ArrowDownWideNarrow color="#fff" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Shipping">Shipping</SelectItem>
                          <SelectItem value="Order Received">Order Received</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableHead>
                  <TableHead className="text-white font-medium text-center">Action</TableHead>
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
                    <TableCell className="text-center">{item.sellerName}</TableCell>
                    <TableCell className="text-center">UK 10</TableCell>
                    <TableCell className="text-center">2 months used</TableCell>
                    <TableCell className="font-medium text-center">${item.purchasePrice.toFixed(2)}</TableCell>
                    <TableCell className="text-center">{item.purchaseDate}</TableCell>
                    <TableCell className="text-center">{item.status}</TableCell>
                    <TableCell>
                      {item?.status === "Delivered" && (
                        <div className="flex justify-center gap-x-2">
                          <Link href={`/individual-user/dashboard/uploaded-products-list/resell`}>
                            <Button
                              variant="outline"
                              className="cursor-pointer border-black/60 bg-transparent"
                              size={"sm"}
                            >
                              Resell
                            </Button>
                          </Link>
                          <Button
                            onClick={() => setIsOpen(true)}
                            variant="outline"
                            size={"sm"}
                            className="cursor-pointer border-black/60"
                          >
                            Return
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="md:hidden space-y-4">
        {/* Status filter moved to top on mobile */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium">Status Filter:</span>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as "All" | "Delivered" | "Shipping" | "Order Received")}
          >
            <SelectTrigger className="w-32 h-9 text-xs">
              <ArrowDownWideNarrow size={16} />
              <span className="ml-1">{statusFilter}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Shipping">Shipping</SelectItem>
              <SelectItem value="Order Received">Order Received</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cards for each product */}
        {filteredItems.map((item) => (
          <Card key={item.id} className="border border-gray-200">
            <CardContent className="p-4">
              {/* Product image and title */}
              <div className="flex gap-3 mb-3">
                <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                  <Link href={`/shop/2`}>
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </Link>
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/shop/2`} className="font-medium text-sm line-clamp-2 hover:underline">
                    {item.title}
                  </Link>
                  <Link href={`/shop/2`} className="text-xs text-gray-500 underline">
                    {item.itemNumber}
                  </Link>
                </div>
              </div>

              {/* Product details grid */}
              <div className="space-y-2 mb-3 border-t border-gray-100 pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Seller:</span>
                  <span className="font-medium">{item.sellerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">UK 10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <span className="font-medium">2 months used</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">${item.purchasePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-xs">{item.purchaseDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${getStatusColor(item.status)}`}>{item.status}</span>
                </div>
              </div>

              {/* Action buttons */}
              {item?.status === "Delivered" && (
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Link href={`/individual-user/dashboard/uploaded-products-list/resell`} className="flex-1">
                    <Button
                      variant="outline"
                      className="cursor-pointer border-black/60 w-full text-xs bg-transparent"
                      size={"sm"}
                    >
                      Resell
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setIsOpen(true)}
                    variant="outline"
                    size={"sm"}
                    className="cursor-pointer border-black/60 flex-1 text-xs"
                  >
                    Return
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <PaginationSection className="mt-5" />
      <ReturnRequestModal open={isOpen} setOpen={setIsOpen} />
    </div>
  )
}
