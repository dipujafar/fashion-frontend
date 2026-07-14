export const OrderStatusFormat: { [key: string]: { label: string, color: string } } = {
    PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    CONFIRMED: { label: "Confirmed", color: "bg-green-100 text-green-800" },
    SHIPPED: { label: "Shipped", color: "bg-blue-100 text-blue-800" },
    DELIVERED: { label: "Delivered", color: "bg-purple-100 text-purple-800" },
    COMPLETED: { label: "Completed", color: "bg-gray-100 text-gray-800" },
    CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-800" }
}

export const CancelReasonFormat: { [key: string]: { label: string, color: string } } = {

    CHANGED_MIND: { label: "Changed Mind", color: "bg-yellow-100 text-yellow-800" },
    FOUND_BETTER_PRICE: { label: "Found Better Price", color: "bg-green-100 text-green-800" },
    ORDERED_BY_MISTAKE: { label: "Ordered by Mistake", color: "bg-blue-100 text-blue-800" },
    ITEM_NO_LONGER_NEEDED: { label: "Item No Longer Needed", color: "bg-purple-100 text-purple-800" },
    DELIVERY_TOO_LONG: { label: "Delivery Too Long", color: "bg-gray-100 text-gray-800" },
    FOUND_BETTER_PRODUCT: { label: "Found Better Product", color: "bg-indigo-100 text-indigo-800" },
    WRONG_ITEM_SELECTED: { label: "Wrong Item Selected", color: "bg-pink-100 text-pink-800" },
    DUPLICATE_ORDER: { label: "Duplicate Order", color: "bg-orange-100 text-orange-800" },
    SHIPPING_COST_TOO_HIGH: { label: "Shipping Cost Too High", color: "bg-red-100 text-red-800" },
    PAYMENT_ISSUE: { label: "Payment Issue", color: "bg-red-100 text-red-800" },
    SELLER_UNRESPONSIVE: { label: "Seller Unresponsive", color: "bg-red-100 text-red-800" },

    OUT_OF_STOCK: { label: "Item Out of Stock", color: "bg-yellow-100 text-yellow-800" },
    UNABLE_TO_FULFILL_IN_TIME: { label: "Unable to Fulfill in Time", color: "bg-blue-100 text-blue-800" },
    PRICING_ERROR: { label: "Pricing Error", color: "bg-red-100 text-red-800" },
    BUYER_UNREACHABLE: { label: "Buyer Unreachable", color: "bg-red-100 text-red-800" },
    SUSPECTED_FRAUD: { label: "Suspected Fraud", color: "bg-red-100 text-red-800" },
    SHIPPING_ADDRESS_ISSUE: { label: "Shipping Address Issue", color: "bg-red-100 text-red-800" },
    LISTING_ERROR: { label: "Listing Error", color: "bg-red-100 text-red-800" },
    BUYER_REQUESTED: { label: "Buyer Requested Cancellation", color: "bg-green-100 text-green-800" },
    DAMAGED_INVENTORY: { label: "Damaged Inventory", color: "bg-orange-100 text-orange-800" },
    PAYMENT_NOT_VERIFIED: { label: "Payment Not Verified", color: "bg-red-100 text-red-800" },

    OTHER: { label: "Other", color: "bg-gray-100 text-gray-800" }

}