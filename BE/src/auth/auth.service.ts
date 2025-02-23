import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashCompare } from 'src/utils/hash';
import { UserInterface, UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }
    async validateUser(email: string, password: string): Promise<UserInterface> {
        const user = await this.userService.findOne(email)
        if (!user || !await hashCompare(password, user?.password)) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Invalid credentials',
            }, HttpStatus.FORBIDDEN, {
            });
        }
        return user
    }
    async login(user: UserInterface): Promise<{ token: string, email : string, name : string }> {
        return {
            token: this.jwtService.sign({ email: user.email, id: user._id }),
            email : user.email,
            name:  user.name
        }
    }
    async getProfile(payload:
        {
            email: string,
            id: string,
            iat: number,
            exp: number
        }
    ): Promise<UserInterface> {
        const user = await this.userService.findById(payload.id)
        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Invalid credentials',
            }, HttpStatus.FORBIDDEN, {
            });
        }
        return {name : user.name, email: user.email, role : user.role, _id : user._id, password : '0'}
    }
}
