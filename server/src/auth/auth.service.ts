import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findOneByEmail(email);
		if (user && (await bcrypt.compare(password, user.password))) {
			const { password, ...result } = user;
			return result;
		}
		throw new HttpException("Неверный логин/пароль", HttpStatus.BAD_REQUEST);
	}

	async login(user: any) {
		const payload = { email: user.email, id: user.id };
		return { access_token: this.jwtService.sign(payload) };
	}
}
