import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { User } from "../user/entities/user.entity";
import { UserModule } from "../user/user.module";

@Module({
	imports: [UserModule, TypeOrmModule.forFeature([Event, User])],
	controllers: [EventController],
	providers: [EventService],
})
export class EventModule {}
