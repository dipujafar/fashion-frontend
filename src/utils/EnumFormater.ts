export const OrderStatusFormat: { [key: string]: { label: string, color: string } } = {
    PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    CONFIRMED: { label: "Confirmed", color: "bg-green-100 text-green-800" },
    SHIPPED: { label: "Shipped", color: "bg-blue-100 text-blue-800" },
    DELIVERED: { label: "Delivered", color: "bg-purple-100 text-purple-800" },
    COMPLETED: { label: "Completed", color: "bg-gray-100 text-gray-800" },
    CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-800" }
}