
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps : true})
export class User {
  @Prop({required : true, trim : true, minlength : 3, maxlength : 50 })
  name: string;

  @Prop({required : true, unique : true})
  email: string;

  @Prop({required : true})
  password: string;

  @Prop({enum : ['user', 'admin'], default: 'user'})
  role : string;


}

export const UserSchema = SchemaFactory.createForClass(User);

