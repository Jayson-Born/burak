import{Request, Response } from "express";
import {T} from '../libs/types/common';
import MemberService from '../models/member.service';

const restaurantController: T ={};
restaurantController.goHome = (req: Request, res: Response)=>{ 
try{
    console.log("go home")
    res.send("Home Page");
} catch (err){
    console.log("Error, goHome:", err);
}
};

restaurantController.getLogin= (req: Request, res: Response)=>{ 

try{
    console.log('got LogIn');
    res.send("Login Page");
} catch (err){
    console.log("Error, LOgging:", err);
};
}

restaurantController.processLogin= (req: Request, res: Response)=>{ 

try{
    console.log('got login ');
    res.send("done")
} catch (err){
    console.log("Error, processLogin:", err);
};
}
restaurantController.getSignUp = (req: Request, res: Response)=>{ 

try{
    console.log('go signUp');
    res.send("SignUp Page");
} catch (err){
    console.log("Error, getSignUp:", err);
};
}

restaurantController.processSignup = (req: Request, res: Response)=>{ 

try{
    console.log('go signUp');
    res.send("Done");
} catch (err){
    console.log("Error, processSignup", err);
};
}

export default restaurantController

