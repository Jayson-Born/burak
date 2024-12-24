import mongoose, {Schema} from "mongoose";
import {MemberStatus, MemberType} from "../libs/enums/member.enums"

const memberSChema = new Schema(
{

memberType:{
    type:String,
    enum: MemberType,
    default: MemberType.USER,
},

memberStatus: {
    type: String,
    enum: MemberStatus,
    default: MemberStatus.ACTIVE,
},

memberNick:{
    type:String,
    enum: MemberStatus,
    default: MemberStatus.ACTIVE,
},

memberPhone: {
    type: String,
    index: {unique: true, sparse: true},
    require: true,
},

memberPassword: {
    type:String,
    select: false,
    required: true,
},

memberAddress: {
    type: String,
},
memberImage: {
    type: String,
},
memberPoints: {
    type: Number,
    default: 0,
},
},
{timestamps: true}  //updated, created
);

