import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./auth-guards/LocalGuard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	async login(@Request() req) {
		return await this.authService.login(req.user);
	}
}
