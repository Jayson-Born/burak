import{Request, Response } from "express";
import {T} from '../libs/types/common';
import MemberService from '../models/member.service';
import {MemberInput} from "../libs/types/member";
import {MemberType} from "../libs/enums/member.enums";
import {AdminRequest, LoginInput}from "../libs/types/member";
import { Message } from "../libs/Errors";



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
    
    restaurantController.processSignup = async(req: AdminRequest, res: Response)=>{ 
    
    try{
        console.log('processSignup');
        console.log("body",req.body);
    
        const newMember: MemberInput = req.body;
        newMember.memberType=MemberType.RESTAURANT;
        const result=await memberService.processSignup(newMember);
       
        
        req.session.member = result;
        req.session.save(function (){
            res.send(result);

        });
    
        
    
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

restaurantController.processLogin= async(req: AdminRequest, res: Response)=>{ 

try{
    console.log('got login ');

    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);
    
    
    req.session.member = result;
    req.session.save(function (){
        res.send(result);

    });

    

  
} catch (err){
    console.log("Error, processLogin:", err);
    res.send (err);
}
}


restaurantController.checkMe= async(req: AdminRequest, res: Response)=>{ 

    try{
        console.log('checkMe session');
        if(req.session?.member) 
            res.send (`<script>alert("Hi, ${req.session.member.memberNick})</script`);
    else res.send(`<script> alert("${Message.NOT_AUTENTICATED}") </script>`)
       
        
    } catch (err){
        console.log("Error, checkMe:", err);
        res.send(err);
    };
};

export default restaurantController;
