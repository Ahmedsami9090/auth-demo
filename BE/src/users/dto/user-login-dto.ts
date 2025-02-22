import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";


export class UserLoginDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @MinLength(8)
    readonly password: string
}