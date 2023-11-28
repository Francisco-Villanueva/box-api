import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { CARRIER_STATUS } from 'src/constants/carrierStatus'

// Cuando este creado, se importa aca
//import { Package } from './product.schema';

//TODO: chequear las condiciones de los campos
export type UsersDocument = HydratedDocument<User>

@Schema()
export class User {
	@Prop({ required: true })
	name: string

	@Prop({ required: true })
	lastName: string

	@Prop({ required: true })
	userName: string

	@Prop({
		unique: true,
		required: true,
		match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
	})
	email: string

	@Prop({ required: false })
	image: string

	@Prop({ required: true })
	password: string

	@Prop({ required: true, default: 'CARRIER' })
	role: string

	@Prop({
		required: true,
		enum: CARRIER_STATUS,
		default: CARRIER_STATUS.DESHABILITADO,
	})
	status: string

	//Acá se hace la relacion de User y Package, descomentar esta linea e importar el modelo cuando este creado.
	// @Prop({type: [{type: "ObjectId", ref: "Package"}]})
	// package: Package[]
}

export const UserSchema = SchemaFactory.createForClass(User)
