import{NextFunction, Request, Response } from "express";
import {T} from '../libs/types/common';
import MemberService from '../models/member.service';
import {MemberInput} from "../libs/types/member";
import {MemberType} from "../libs/enums/member.enums";
import {AdminRequest, LoginInput}from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";



const memberService = new MemberService();

const restaurantController: T ={};
restaurantController.goHome = (req: Request, res: Response)=>{ 
try{
    console.log("go home")
    res.render("Home");
} catch (err){
    console.log("Error, goHome:", err);
    res.redirect("/admin");
}
};



restaurantController.getSignUp = (req: Request, res: Response)=>{ 

    try{
        console.log('get signUp');
        res.render("signup");
    } catch (err){
        console.log("Error, getSignUp:", err);
        res.redirect("/admin");
    };
    };

restaurantController.getLogin= (req: Request, res: Response)=>{ 

    try{
        console.log('got LogIn');
        res.render("login");
    } catch (err){
        console.log("Error, LOgging:", err);
        res.redirect("/admin");
    };
    };              
    
    restaurantController.processSignup = async(req: AdminRequest, res: Response)=>{ 
    
    try{
        console.log('processSignup');
        const file = req.file;
        if(!file) 
            throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    
        const newMember: MemberInput = req.body;
        newMember.memberType=MemberType.RESTAURANT;
        const result=await memberService.processSignup(newMember);
       
        
        req.session.member = result;
        req.session.save(function (){
            res.redirect("/admin/product/all");

        });
    
        
    
    } catch (err){
        console.log("Error, processSignup", err);
        console.log("Error, processLogin:", err);
        const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send (`<script>alert("${message}"); 
            window.location.reeplace("admin/signup")</script`);
    }

    };
    
    



restaurantController.processLogin= async(req: AdminRequest, res: Response)=>{ 

try{
    console.log('got login ');

    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);
    
    
    req.session.member = result;
    req.session.save(function (){
        res.redirect("/admin/product/all");

    });

} catch (err){
    console.log("Error, processLogin:", err);
    console.log("Error, processLogin:", err);
    const message =
    err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send (`<script>alert("${message}"); 
        window.location.reeplace("admin/login")</script`);
    
}
}


restaurantController.logout= async(req: AdminRequest, res: Response)=>{ 

try{
    console.log('logout ');
    req.session.destroy(function(){
        res.redirect("/admin");
    })

  
} catch (err){
    console.log("Error, logout:", err);
    res.redirect("/admin");
   
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
    };}


restaurantController.verfyRestaurant = (
    req:AdminRequest,
    res: Response,
    next: NextFunction
) =>{
    if(req.session?.member?.memberType === MemberType.RESTAURANT){
    req.member = req.session.member;
    next();
} else {
    const message = Message.NOT_AUTENTICATED;
    res.send(
        `<script> alert("${message}"); window.location.replace('/admin/login'); </script>`
    );
}
}


export default restaurantController;
