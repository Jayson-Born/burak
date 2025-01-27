import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberStatus, MemberType } from "../libs/enums/member.enums";
import * as bcrypt from "bcryptjs";
import { Product, ProductInput } from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {
    static createNewProduct(data: ProductInput) {
        throw new Error('Method not implemented.');
    }
    createNewProduct(data: ProductInput) {
        throw new Error('Method not implemented.');
    }
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel;
    }


    /**SPA */

    public async getRestaurant(): Promise<Member> {
        const result =await this.memberModel
        .findOne({ memberType: MemberType.RESTAURANT})
        .lean()
        .exec();
        if (! result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        return result as unknown as Member;
    }

    public async signup(input: MemberInput): Promise<Member> {
        const salt = await bcrypt.genSalt();
        input.memberPassword= await bcrypt.hash(input.memberPassword, salt);
        
        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result.toJSON() as Member;

        } catch (err) {
            console.error('ERROR, model:signup', err);;
            throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
        }
    }

    public async login(input: LoginInput): Promise<Member> {
        //TODO: consider numbeer status
        const member = await this.memberModel
            .findOne(
                { 
                    memberNick: input.memberNick,
                    memberStatus: {$ne: MemberStatus.DELETE},
                 },
                 { memberNick: 1, memberPassword: 1, memberStatus: 1, })
            .exec();

        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        else if (member.memberStatus === MemberStatus.BLOCK) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.BLOCKED_USER);
        }


        const isMatch = await bcrypt.compare(
            input.memberPassword,
             member.memberPassword
            );

        //const isMatch = member.memberPassword === input.memberPassword;
        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }
         const mama = await this.memberModel.findById(member._id).lean().exec()
        return mama as unknown as Member;
    }

    public async getMemberDetail(member: Member): Promise<Member>{
        const memberId = shapeIntoMongooseObjectId(member._id);
        const result =await this.memberModel.findOne({_id: memberId, MemberStatus: MemberStatus.ACTIVE})
        .exec();
        if ( !result) throw new Errors(HttpCode.NOT_FOUND, Message.CREATE_FAILED)
        
        return result as unknown as Member;
    }

    public async updateMember(
        member: Member,
        input: MemberUpdateInput
    ): Promise<Member> {
        const memberId = shapeIntoMongooseObjectId(member._id);
        const result =await this.memberModel 
         .findOneAndUpdate ({_id: memberId}, input, { new: true})
         .exec();
         if(!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

         return result as unknown as Member;
    }

    public async getTopUsers(): Promise<Member[]> {
        const result = await this.memberModel
        .find({
            memberStatus: MemberStatus.ACTIVE,
            memberPoints: { $gte: 1},
        })
        .sort({memberPoints: -1 })
        .limit(4)
        .exec();
        if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        return result.map(member => member.toObject()) as Member[];
    }

    /**SSR */
    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel.findOne({ memberType: MemberType.RESTAURANT }).lean().exec();
        console.log("exist:", exist);

        if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

       
        const salt = await bcrypt.genSalt();
        input.memberPassword= await bcrypt.hash(input.memberPassword, salt);

        

        try {
            const result = await this.memberModel.create(input);

            // const tempResult = new this.memberModel(input);
            // const result = await tempResult.save();
            result.memberPassword = "";
            return result.toObject();

        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async processLogin(input: LoginInput): Promise<Member> {
        const member = await this.memberModel
            .findOne({ memberNick: input.memberNick }, { memberNick: 1, memberPassword: 1 })
            .exec();

        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

        const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);

        //const isMatch = member.memberPassword === input.memberPassword;
        console.log("isMatch:", isMatch);
        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }
         const mama = await this.memberModel.findById(member._id).exec()
        return mama as unknown as Member;
    }


    public async getUsers(): Promise<Member[]> {
        const result = await this.memberModel
        .find({memberType: MemberType.USER})
        .exec();
     if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

     return result as unknown as Member[];
    }

    public async updateChosenUser(input: MemberUpdateInput): Promise<Member[]> {
         input._id =shapeIntoMongooseObjectId(input._id);
        const result = await this.memberModel
        .findByIdAndUpdate({_id : input._id}, input, {new: true})
        .exec();
     if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

     return result as unknown as Member[];
    }
}

export default MemberService;