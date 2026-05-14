import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { OrderEntity } from "./entities/order.entity";
import { OrderCommandHandler } from "./handlers/order-command.handler";
import { OrderController } from "./controllers/order.controller";
import { HealthController } from "./controllers/health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.ORDER_DB_NAME || "order_db",
      entities: [OrderEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  controllers: [OrderController, HealthController],
  providers: [OrderCommandHandler],
})
export class AppModule {}
