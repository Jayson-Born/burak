import OrderItemModel from "../schema/Order.model";
import OrderModel from "../schema/Order.model";

    class OrdeerService{
        private readonly orderModel;
        private readonly orderItemModel;

        constructor() {
            this.orderModel = OrderModel;
            this.orderItemModel = OrderItemModel;
        }
    }