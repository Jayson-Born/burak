import{Request, Response } from "express";
import {T} from '../libs/types/common'
import {Member, LoginInput, MemberInput } from '../libs/types/member';
import { MemberType } from '../libs/enums/member.enums';
import MemberService from '../models/Member.service';
import Errors from "../libs/Errors";


    const memberService = new MemberService();

const memberController: T ={};
    memberController.signup = async(req: Request, res: Response)=>{ 

        try{
            console.log('Signup');
            console.log("body",req.body);
        
            const input: MemberInput = req.body,
            result: Member = await memberService.signup(input);
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
        console.log('login ');
        console.log("body:",req.body);
        
        const input: LoginInput = req.body,
        result = await memberService.login(input);
        //TODO TOKENS AUTHENTICATION
    
        res.json( {member : result});
    } catch (err){
        console.log("Error, login:", err);
        res.send (err);
    }
    };
    
export default memberController