export enum OrderStatus{
    PENDING = "pending",
    IN_PROGRESS = "in progress",
    IN_DELIVERY = "in delivery",
    DELIVERED = "delivered",
    RETURNED = "returned",
    CANCELED = "canceled"
}

/**
 * PENDING // NEW ORDER
 * IN PROGRESS // SHIPMENT MANAGEMENT IS IN PROGRESS
 * IN DELIVERY // ORDER HAS BEEN SENT OUT
 * DELIVERED // ORDER HAS BEEN RECEIVED BY CUSTOMER
 * RETURNED // ORDER/ITEM HAS BEEN RETURNED
 * CANCELED // ORDER CANCELED BY ADMIN
 */