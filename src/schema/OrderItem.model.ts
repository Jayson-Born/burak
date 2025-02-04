import mongoose, {Schema} from "mongoose";

const orderItemSchema = new Schema(
    {
        itemQuantity: {
            type: Number,
            required: true;

        },

        itemPrice: {
            type: Schema.Types.ObjectId,
            rea: "Order",
        },

        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    },
    { timestamps: true, collection: "orederItems"}
);

export default mongoose.model("OrderItems", orderItemSchema);
