import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ShipmentEntity } from "./entities/shipment.entity";
import { ShippingCommandHandler } from "./handlers/shipping-command.handler";
import { ShippingController } from "./controllers/shipping.controller";
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
      database: process.env.SHIPPING_DB_NAME || "shipping_db",
      entities: [ShipmentEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([ShipmentEntity]),
  ],
  controllers: [ShippingController, HealthController],
  providers: [ShippingCommandHandler],
})
export class AppModule {}
