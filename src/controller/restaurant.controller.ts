import{Request, Response } from "express";
import {T} from '../libs/types/common';
import MemberService from '../models/member.service';

const memberController: T ={};
memberController.goHome = (req: Request, res: Response)=>{ 
try{
    console.log("go home")
    res.send("Home Page");
} catch (err){
    console.log("Error, goHome:", err);
}
};

memberController.getLogin= (req: Request, res: Response)=>{ 

try{
    console.log('got LogIn');
    res.send("Login Page");
} catch (err){
    console.log("Error, LOgging:", err);
};
}
memberController.getSignUp = (req: Request, res: Response)=>{ 

try{
    console.log('go signUp');
    res.send("SignUp Page");
} catch (err){
    console.log("Error, getSignUp:", err);
};
}

export default memberController

