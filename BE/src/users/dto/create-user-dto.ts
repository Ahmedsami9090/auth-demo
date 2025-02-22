import { IsEmail,
    IsNotEmpty, 
    IsString, 
    Matches, 
    MinLength } from 'class-validator';


export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).+$/, {
        message:
            'The password must contain at least one letter, one number, and one special character.',
    })
    readonly password: string
}