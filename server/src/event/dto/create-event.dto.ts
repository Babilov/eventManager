import { IsDate, IsNumber, IsNumberString, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateEventDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsDate()
	@Type(() => Date)
	date: Date;

	@IsNumberString()
	xCord: number;

	@IsNumberString()
	yCord: number;

	@IsNumberString()
	price: number;
}
