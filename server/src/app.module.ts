const settings = require("../ormconfig.json");
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, ValidationPipe } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { EventModule } from "./event/event.module";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(settings),
		UserModule,
		EventModule,
		AuthModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
})
export class AppModule {}
