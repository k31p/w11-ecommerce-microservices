import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "@ecommerce/shared-library";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix("api/v1");
  app.useGlobalFilters(new HttpExceptionFilter());

  // CORS configuration from environment
  const corsOrigins =
    configService.get<string>("CORS_ORIGINS")?.split(",") || [];
  if (corsOrigins.length > 0) {
    app.enableCors({
      origin: corsOrigins,
      credentials: true,
    });
  } else {
    app.enableCors(); // Warning: allows all origins
  }

  await app.listen(3000);
  console.log("🚀 API Gateway running on port 3000");
}

bootstrap();
