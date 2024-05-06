import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Request,
	Query,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { JwtAuthGuard } from "../auth/auth-guards/JwtAuthGuard";

@Controller("event")
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Request() req, @Body() createEventDto: CreateEventDto) {
		return this.eventService.create(+req.user.id, createEventDto);
	}

	@UseGuards(JwtAuthGuard)
	@Post(":eventId")
	subscribeToEvent(@Request() req, @Param("eventId") eventId: number) {
		return this.eventService.subscribeToEvent(req.user.id, eventId);
	}

	@UseGuards(JwtAuthGuard)
	@Delete("unsubscribe/:eventId")
	unsubscribeToEvent(@Request() req, @Param("eventId") eventId: number) {
		return this.eventService.unsubscribeToEvent(req.user.id, +eventId);
	}

	@Get()
	findAll(@Query("userId") userId: string) {
		return this.eventService.findAll(+userId);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.eventService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
		return this.eventService.update(+id, updateEventDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string, @Request() req) {
		return this.eventService.remove(+id, +req.user.id);
	}
}
