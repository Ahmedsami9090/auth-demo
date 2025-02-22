import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from 'src/users/dto/user-login-dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    // @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() userLoginDTO : UserLoginDTO){
        const user =  await this.authService.validateUser(userLoginDTO.email, userLoginDTO.password);
        return await this.authService.login(user)
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req){
        return await this.authService.getProfile(req.decoded)
    }

}
