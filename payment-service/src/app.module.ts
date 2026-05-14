import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { PaymentEntity } from "./entities/payment.entity";
import { PaymentCommandHandler } from "./handlers/payment-command.handler";
import { PaymentController } from "./controllers/payment.controller";
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
      database: process.env.PAYMENT_DB_NAME || "payment_db",
      entities: [PaymentEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([PaymentEntity]),
  ],
  controllers: [PaymentController, HealthController],
  providers: [PaymentCommandHandler],
})
export class AppModule {}
