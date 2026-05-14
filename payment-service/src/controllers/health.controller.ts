import { Controller, Get } from "@nestjs/common";

@Controller("payments")
export class HealthController {
  @Get("health")
  healthCheck() {
    return { status: "ok", timestamp: new Date().toISOString() };
  }
}
