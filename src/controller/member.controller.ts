import{Request, Response } from "express";
import {T} from '../libs/types/common'
import {Member, LoginInput, MemberInput } from '../libs/types/member';
import MemberService from '../models/Member.service';
import Errors from "../libs/Errors";
import AuthService from "../models/Auth.service";



    const memberService = new MemberService();
    const authService = new AuthService()

const memberController: T ={};
    memberController.signup = async(req: Request, res: Response)=>{ 

        try{
            console.log('Signup');
            console.log("body",req.body);
        
            const input: MemberInput = req.body,
            result: Member = await memberService.signup(input),
            token =await authService.createToken(result);
             console.log("token =>", token)
            //TODO TOKENS AUTHENTICATION
        
            res.json( {member : result});
        
        } catch (err){
            console.log("Error, signup", err);
            if(err instanceof Errors) res.status(err.code).json(err);
            else res.status(Errors.standard.code).json(Errors.standard);
        };
        }

        memberController.login = async(req: Request, res: Response)=>{ 
    try{
       
        console.log("login")
        console.log("body",req.body);
        
        const input: LoginInput = req.body,
        result : Member = await memberService.login(input),
        token =await authService.createToken(result);
        console.log("token =>", token)
        
    
        res.json( {member : result});
    } catch (err){
        console.log("Error, login:", err);
        res.send (err);
    }
    };
    
export default memberController