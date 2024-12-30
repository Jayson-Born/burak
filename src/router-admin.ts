import express,{Request, Response} from 'express';
const routerAdmin = express.Router();
import restaurantController from "./controller/restaurant.controller";


/**Restaurant */

routerAdmin.get("/", (restaurantController.goHome));
routerAdmin
 .get("/login", (restaurantController.getLogin))
 .post("/login", (restaurantController.processLogin));

routerAdmin
.get("/signUp", (restaurantController.getSignUp))
.post("/signUp",restaurantController.processSignup );

routerAdmin.get("/logout", (restaurantController.logout))
routerAdmin.get("/checkme", (restaurantController.checkMe))

/** Product */

/** User */
export default routerAdmin;

