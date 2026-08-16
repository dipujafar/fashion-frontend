import { OrderStatus, CurrentShipTo, OrderAuthStatus, CancelReason } from "@/types"

export const getOrderStatusFormat = (
    status: OrderStatus,
    currentShipTo?: CurrentShipTo,
    authStatus?: OrderAuthStatus
): { label: string; color: string; details: string } => {
    const isAuthCenter = currentShipTo === CurrentShipTo.AUTHENTICATION_CENTER

    switch (status) {
        case OrderStatus.PENDING:
            return {
                label: "Pending",
                color: "bg-yellow-100 text-yellow-800",
                details: "Order has been placed and is awaiting processing.",
            }

        case OrderStatus.SHIPPED:
            return isAuthCenter
                ? {
                    label: "Shipped to Auth",
                    color: "bg-blue-100 text-blue-800",
                    details: "Item has shipped and is on its way to the Authentication Center.",
                }
                : {
                    label: "Shipped",
                    color: "bg-blue-100 text-blue-800",
                    details: "Item has shipped and is on its way to the buyer.",
                }

        case OrderStatus.OUT_FOR_DELIVERY:
            return isAuthCenter
                ? {
                    label: "In Transit",
                    color: "bg-indigo-100 text-indigo-800",
                    details: "Item is in transit and out for delivery to the Authentication Center.",
                }
                : {
                    label: "In Transit",
                    color: "bg-indigo-100 text-indigo-800",
                    details: "Item is in transit and out for delivery to the buyer.",
                }

        case OrderStatus.DELIVERED:
            if (!isAuthCenter) {
                return {
                    label: "Delivered",
                    color: "bg-purple-100 text-purple-800",
                    details: "Item has been delivered to the buyer.",
                }
            }
            switch (authStatus) {
                case OrderAuthStatus.ITEM_RECEIVED:
                    return {
                        label: "Auth: Received",
                        color: "bg-purple-100 text-purple-800",
                        details: "Item has been received at the Authentication Center and is awaiting review.",
                    }
                case OrderAuthStatus.IN_PROGRESS:
                    return {
                        label: "Auth: In Progress",
                        color: "bg-purple-100 text-purple-800",
                        details: "Item is currently being authenticated.",
                    }
                case OrderAuthStatus.RESPONDED:
                    return {
                        label: "Auth: Responded",
                        color: "bg-purple-100 text-purple-800",
                        details: "Authentication has been completed and a response has been issued.",
                    }
                case OrderAuthStatus.NOT_STARTED:
                default:
                    return {
                        label: "Delivered to Auth",
                        color: "bg-purple-100 text-purple-800",
                        details: "Item has been delivered to the Authentication Center. Review has not started yet.",
                    }
            }

        case OrderStatus.COMPLETED:
            return {
                label: "Completed",
                color: "bg-green-500",
                details: "Order has been completed.",
            }

        case OrderStatus.CANCELLED:
            return {
                label: "Cancelled",
                color: "bg-red-500",
                details: "Order has been cancelled.",
            }

        default:
            return {
                label: "Unknown",
                color: "bg-gray-100 text-gray-800",
                details: "Status unavailable.",
            }
    }
}

export const CancelReasonFormat: Record<CancelReason, { label: string; color: string }> = {
  // Buyer-initiated reasons
  CHANGED_MIND: { label: "Changed Mind", color: "bg-gray-100 text-gray-800" },
  FOUND_BETTER_PRICE: { label: "Found Better Price", color: "bg-blue-100 text-blue-800" },
  ORDERED_BY_MISTAKE: { label: "Ordered by Mistake", color: "bg-gray-100 text-gray-800" },
  ITEM_NO_LONGER_NEEDED: { label: "Item No Longer Needed", color: "bg-gray-100 text-gray-800" },
  DELIVERY_TOO_LONG: { label: "Delivery Too Long", color: "bg-yellow-100 text-yellow-800" },
  FOUND_BETTER_PRODUCT: { label: "Found Better Product", color: "bg-blue-100 text-blue-800" },
  WRONG_ITEM_SELECTED: { label: "Wrong Item Selected", color: "bg-gray-100 text-gray-800" },
  DUPLICATE_ORDER: { label: "Duplicate Order", color: "bg-gray-100 text-gray-800" },
  SHIPPING_COST_TOO_HIGH: { label: "Shipping Cost Too High", color: "bg-yellow-100 text-yellow-800" },
  PAYMENT_ISSUE: { label: "Payment Issue", color: "bg-red-100 text-red-800" },
  SELLER_UNRESPONSIVE: { label: "Seller Unresponsive", color: "bg-red-100 text-red-800" },

  // Seller-initiated reasons
  OUT_OF_STOCK: { label: "Out of Stock", color: "bg-orange-100 text-orange-800" },
  UNABLE_TO_FULFILL_IN_TIME: { label: "Unable to Fulfill in Time", color: "bg-orange-100 text-orange-800" },
  PRICING_ERROR: { label: "Pricing Error", color: "bg-orange-100 text-orange-800" },
  BUYER_UNREACHABLE: { label: "Buyer Unreachable", color: "bg-red-100 text-red-800" },
  SUSPECTED_FRAUD: { label: "Suspected Fraud", color: "bg-red-100 text-red-800" },
  SHIPPING_ADDRESS_ISSUE: { label: "Shipping Address Issue", color: "bg-yellow-100 text-yellow-800" },
  LISTING_ERROR: { label: "Listing Error", color: "bg-orange-100 text-orange-800" },
  BUYER_REQUESTED: { label: "Buyer Requested", color: "bg-blue-100 text-blue-800" },
  DAMAGED_INVENTORY: { label: "Damaged Inventory", color: "bg-red-100 text-red-800" },
  PAYMENT_NOT_VERIFIED: { label: "Payment Not Verified", color: "bg-red-100 text-red-800" },

  OTHER: { label: "Other", color: "bg-gray-100 text-gray-800" },
}