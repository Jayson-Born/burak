import express,{Request, Response} from 'express';
const routerAdmin = express.Router();
import restaurantController from "./controller/restaurant.controller";

routerAdmin.get("/", (restaurantController.goHome));

routerAdmin
 .get("/login", (restaurantController.getLogin))
 .post("/login", (restaurantController.processLogin));

routerAdmin
.get("/signUp", (restaurantController.getSignUp))
.post("/signUp",restaurantController.processSignup );

export default routerAdmin;

