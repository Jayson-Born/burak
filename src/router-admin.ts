import express,{Request, Response} from 'express';
const routerAdmin = express.Router();
import restaurantController from "./controller/restaurant.controller";
import productController from "../src/controller/product.controoller";
import  makeUploader  from './libs/utils/uploader';


/**Restaurant */

routerAdmin.get("/", restaurantController.goHome);
routerAdmin
 .get("/login", restaurantController.getLogin)
 .post("/login", restaurantController.processLogin);

routerAdmin
.get("/signUp", restaurantController.getSignUp)
.post("/signUp",
    makeUploader ("members").single("memberImage"),
    restaurantController.processSignup );

routerAdmin.get("/logout", restaurantController.logout)
routerAdmin.get("/checkme", restaurantController.checkMe)

/** Product */
routerAdmin.get("/product/all", 
    restaurantController.verfyRestaurant,
    productController.getAllProducts)
routerAdmin.post("/product/create", 
    restaurantController.verfyRestaurant,
    makeUploader ("products").array("productImages", 5 ),
     productController.createNewProduct)
routerAdmin.post("/product/:id", 
    restaurantController.verfyRestaurant,
     productController.updateChosenProduct)
/** User */
export default routerAdmin;

