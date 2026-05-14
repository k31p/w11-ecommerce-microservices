import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { OrderController } from "./controllers/order.controller";
import { HealthController } from "./controllers/health.controller";
import { OrderService } from "./services/order.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    HttpModule,
  ],
  controllers: [OrderController, HealthController],
  providers: [OrderService],
})
export class AppModule {}
