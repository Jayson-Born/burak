import { ProductStatus } from "../libs/enums/product.enums";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Product, ProductInput, ProductInquiry, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model"
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";

class ProductService {

    private readonly productModel;
    public viewService;

    constructor() {
        this.productModel = ProductModel;
        this.viewService = new ViewService()
    }

    /* SPA */
    public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
        const match: T = { productStatus: ProductStatus.PROCESS };

        if (inquiry.productCollection)
            match.productCollection = inquiry.productCollection;
        if (inquiry.search)
            match.productName = { $regex: new RegExp(inquiry.search, "i") };

        const sort: T =
            inquiry.order === "productPrice"
                ? { [inquiry.order]: 1 }
                : { [inquiry.order]: -1 };

        const result = await this.productModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
                { $limit: inquiry.limit * 1 },
            ])
            .exec();

        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        return result as unknown as Product[];
    }
    public async getProduct(
        memberId: ObjectId | null,
        id: string
    ): Promise<Product> {
        const productId = shapeIntoMongooseObjectId(id);

        let result = await this.productModel
            .findOne({
                _id: productId,
                productStatus: ProductStatus.PROCESS,
            })
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        if (memberId) {
            // Check View Log Existence
            const input: ViewInput = {
                memberId: memberId,
                viewRefId: productId,
                viewGroup: ViewGroup.PRODUCT,
            }
            const existView = await this.viewService.checkviewExistance(input);

            console.log("exist:", !!existView);
            // Insert New View Log
            if (!existView) {
                console.log("PLANNING TO INSERT NEW VIEW");
                await this.viewService.insertMemberView(input);

                //Increase Target View
                result = await this.productModel
                    .findByIdAndUpdate(
                        productId,
                        { $inc: { productViews: +1 } },
                        { new: true }
                    )
                    .exec();
            }
        }
        return result as unknown as Product;
    }


    /* SSR */

    public async getAllProducts(): Promise<Product> {

        const result = await this.productModel.find().exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        return result as unknown as Product

    }

    public async createNewProducts(input: ProductInput): Promise<Product> {
        try {
            const createdProduct = await this.productModel.create(input);
            return createdProduct.toObject() as Product;
        } catch (err) {
            console.error("ERROR, model:createNewProduct", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            const createdProduct = await this.productModel.create(input);
            return createdProduct.toObject() as Product;
        } catch (err) {
            console.error("Error, model:createNewProduct:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }


    public async updateChosenProduct(
        id: string,
        input: ProductUpdateInput):
        Promise<Product> {

        // string => objectId
        id = shapeIntoMongooseObjectId(id);
        const result = await this.productModel.findOneAndUpdate({ _id: id }, input, { new: true })
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
        return result as unknown as Product

    }
}

export default ProductService;