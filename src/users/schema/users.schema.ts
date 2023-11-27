import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//TODO: chequear las condiciones de los campos
export type UsersDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  lastName: string;

  @Prop({ unique: true, required: true, match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/})
  email: string;

  @Prop({required: false})
  image: string

  @Prop({required: true})
  password: string

  @Prop({required: true,  default: "CARRIER"})
  role: string

  @Prop({required: true, default: "HABILITADO"})
  status: string

}

export const UserSchema = SchemaFactory.createForClass(User);