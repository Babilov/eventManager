import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(createUserDto);
		user.password = await bcrypt.hash(createUserDto.password, 10);
		return await this.userRepository.save(user);
	}

	async findAll(): Promise<User[]> {
		return await this.userRepository.find({
			relations: ["events", "participatedEvents"],
		});
	}

	async findOne(id: number): Promise<User> {
		return await this.userRepository.findOne({
			where: { id },
			relations: ["events", "participatedEvents"],
		});
	}

	async getProfile(id: number): Promise<Partial<User>> {
		const res = await this.findOne(id);
		const { password, ...user } = res;
		return user;
	}

	async findOneByEmail(email: string): Promise<User> {
		return await this.userRepository.findOne({
			where: { email },
			relations: ["events"],
		});
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
		const user = await this.findOne(id);
		if (!user) {
			return null;
		}
		Object.assign(user, updateUserDto);
		return await this.userRepository.save(user);
	}

	async remove(id: number): Promise<User | null> {
		const user = await this.findOne(id);
		if (!user) {
			return null;
		}
		return await this.userRepository.remove(user);
	}
}
