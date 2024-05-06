import { Repository } from "typeorm";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";

import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./entities/event.entity";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(Event)
		private readonly eventRepository: Repository<Event>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly userService: UserService,
	) {}

	async create(id: number, createEventDto: CreateEventDto): Promise<Event> {
		const event = this.eventRepository.create(createEventDto);
		event.user = id;
		const placeRes = await axios.get(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${createEventDto.xCord}&lon=${createEventDto.yCord}`,
		);
		event.address = placeRes.data.display_name;
		const savedEvent = await this.eventRepository.save(event);
		await this.subscribeToEvent(id, +savedEvent.id);
		return savedEvent;
	}

	async subscribeToEvent(
		userId: number,
		eventId: number,
	): Promise<User | null> {
		const user = await this.userService.findOne(userId);
		if (!user) {
			return null;
		}

		const event = await this.findOne(eventId);
		if (!eventId) {
			return null;
		}

		if (!user.participatedEvents) {
			user.participatedEvents = [];
		}

		user.participatedEvents.push(event);
		return await this.userRepository.save(user);
	}

	async unsubscribeToEvent(userId: number, eventId: number) {
		const user = await this.userService.findOne(userId);
		if (!user) {
			return null;
		}

		user.participatedEvents = user.participatedEvents.filter(
			(event: Event) => event.id !== eventId,
		);
		return await this.userRepository.save(user);
	}

	async findAll(userId?: number): Promise<Event[]> {
		if (!userId) {
			return await this.eventRepository.find();
		}
		try {
			return await this.eventRepository
				.createQueryBuilder("event")
				.where("event.userId = :userId", { userId })
				.getMany();
		} catch (error) {
			throw new Error(`Failed to find events by user ID: ${error.message}`);
		}
	}

	async findOne(id: number): Promise<Event> {
		return await this.eventRepository.findOne({
			where: { id },
			relations: ["user"],
		});
	}

	async update(
		id: number,
		updateEventDto: UpdateEventDto,
	): Promise<Event> | null {
		const event = await this.findOne(id);
		if (!event) {
			return null;
		}
		Object.assign(event, updateEventDto);
		if (updateEventDto.xCord || updateEventDto.yCord) {
			const placeRes = await axios.get(
				`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${updateEventDto.xCord}&lon=${updateEventDto.yCord}`,
			);
			event.address = placeRes.data.display_name;
		}
		return await this.eventRepository.save(event);
	}

	async remove(id: number, userId: number): Promise<Event | void> | null {
		const event = await this.findOne(id);
		if (!event) {
			return null;
		}
		if (event.user["id"] !== userId) {
			throw new ForbiddenException("Нет доступа");
		}
		return await this.eventRepository.remove(event);
	}
}
