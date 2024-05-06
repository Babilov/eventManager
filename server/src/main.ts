import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Event Manager")
		.setDescription("Api witch helps to manage events")
		.setVersion("1.0")
		.addTag("Event Manager")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	app.enableCors();
	await app.listen(8080, () => console.log("Server started on port 8080"));
}

bootstrap();
