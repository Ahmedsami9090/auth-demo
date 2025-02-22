import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';


export interface UserInterface extends User {
    _id: string,
}

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    async create(createUserDTO: CreateUserDTO): Promise<User> {
        return await this.userModel.create(createUserDTO)
    }
    async findOne(email: string): Promise<UserInterface | null> {
        return await this.userModel.findOne({ email })
    }
    async findById(id : string) : Promise<UserInterface | null> {
        return await this.userModel.findById(id)
    }
}


