import express,{Request, Response} from 'express';
const routerAdmin = express.Router();
import restaurantController from "./controller/restaurant.controller";

routerAdmin.get("/", (restaurantController.goHome));

routerAdmin.get("/login", (restaurantController.getLogin));

routerAdmin.get("/signUp", (restaurantController.getSignUp));

export default routerAdmin;

