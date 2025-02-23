import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post('signup')
    async create(@Body() createUserDTO: CreateUserDTO) {
        try {
            await this.usersService.create(createUserDTO)
            return {msg : 'success'}
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                message: error.message,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
}
