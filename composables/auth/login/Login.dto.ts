import { Expose, Type } from "class-transformer";
import { IdentityDto } from "../Auth.dto";
import { Identity } from "../Auth.interface";

export class LoginDto{
    @Expose()
    @Type(()=>IdentityDto)
    identity:IdentityDto
    @Expose()
    access_token:string
    @Expose()
    refresh_token:string
    @Expose()
    expires_in
}