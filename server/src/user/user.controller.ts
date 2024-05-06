import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
	Request,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/auth-guards/JwtAuthGuard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";

@ApiTags("user")
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiResponse({ status: 200, description: "Регистрация пользователя" })
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get("profile")
	getProfile(@Request() req) {
		return this.userService.getProfile(+req.user.id);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.userService.findOne(+id);
	}

	@Get("/email/:email")
	findByEmail(@Param("email") email: string) {
		return this.userService.findOneByEmail(email);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	update(@Request() req: { user: User }, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+req.user.id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.userService.remove(+id);
	}
}
