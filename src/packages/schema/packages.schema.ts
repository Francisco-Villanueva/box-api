import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

//TODO: chequear las condiciones de los campos
export type PackageDocument = HydratedDocument<Package>

@Schema()
export class Package {
	@Prop({ required: true })
	address: string

	@Prop({ required: true })
	clientName: string

	@Prop({ required: true })
	weight: number

	// TODO cambiar el type a Date.
	@Prop({ required: true })
	deliverDate: string

	@Prop({ required: false, default: 'NO ASIGNADO' })
	status: string

	@Prop({ required: false, default: true })
	isShownToAdmin: boolean

	@Prop({ required: false, default: true })
	isShownToCarrier: boolean
}

export const PackageSchema = SchemaFactory.createForClass(Package)

/*
Formato JSON del fakeData para packages en Client: 

			"address": "Carlos Pellegrini 1163, Buenos Aires, Argentina",
			"clientName": "Miguel Rodr\u00edguez",
			"weight": 118.47,
			"deliverDate": "2023-11-15",
			"status": "EN CURSO",
			"_id": "a690fac1-f4a4-478b-8c04-e477b06c2614"
*/
