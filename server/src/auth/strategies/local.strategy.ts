import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: "email" }); // указываем, что поле для логина это email
	}

	async validate(email: string, password: string) {
		if (!email || !password) {
			throw new BadRequestException();
		}
		const user = await this.authService.validateUser(email, password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
