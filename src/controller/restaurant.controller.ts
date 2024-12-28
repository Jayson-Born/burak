import{Request, Response } from "express";
import {T} from '../libs/types/common';
import MemberService from '../models/member.service';
import {MemberInput} from "../libs/types/member";
import {MemberType} from "../libs/enums/member.enums";
import {LoginInput}from "../libs/types/member";


const memberService = new MemberService();

const restaurantController: T ={};
restaurantController.goHome = (req: Request, res: Response)=>{ 
try{
    console.log("go home")
    res.render("Home");
} catch (err){
    console.log("Error, goHome:", err);
}
};


restaurantController.getSignUp = (req: Request, res: Response)=>{ 

    try{
        console.log('get signUp');
        res.render("signup");
    } catch (err){
        console.log("Error, getSignUp:", err);
    };
    }
    
    restaurantController.processSignup = async(req: Request, res: Response)=>{ 
    
    try{
        console.log('processSignup');
        console.log("body",req.body);
    
        const newMember: MemberInput = req.body;
        newMember.memberType=MemberType.RESTAURANT;
        const result=await memberService.processSignup(newMember);
        //TODO SESSION AUTHINTICATION
    
        res.send(result);
    
    } catch (err){
        console.log("Error, processSignup", err);
        res.send(err);
    };
    }
    

restaurantController.getLogin= (req: Request, res: Response)=>{ 

try{
    console.log('got LogIn');
    res.render("login");
} catch (err){
    console.log("Error, LOgging:", err);
};
}

restaurantController.processLogin= async(req: Request, res: Response)=>{ 

try{
    console.log('got login ');

    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);
    // TODO SESSION AUTHINTICATION

    res.send(result);
} catch (err){
    console.log("Error, processLogin:", err);
    res.send (err);
}
}


export default restaurantController

