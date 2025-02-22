import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { hashData } from 'src/utils/hash';

@Module({
    imports:  [
        MongooseModule.forFeatureAsync(
            [{
                name : User.name,
                useFactory : ()=>{
                    const schema = UserSchema
                    schema.pre('save', async function(){
                        this.name = this.name.replace(/\s+/g, ' ')
                        this.password = await hashData(this.password)
                    })
                    return schema
                },
            }]
        ),
    ],
    exports:  [UsersService],
    controllers:  [UsersController],
    providers : [UsersService]
})
export class UsersModule {}
