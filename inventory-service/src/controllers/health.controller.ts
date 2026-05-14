import { Controller, Get } from "@nestjs/common";

@Controller("inventory")
export class HealthController {
  @Get("health")
  healthCheck() {
    return { status: "ok", timestamp: new Date().toISOString() };
  }
}
