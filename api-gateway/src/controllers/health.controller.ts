import { Controller, Get } from "@nestjs/common";

@Controller("api/v1")
export class HealthController {
  @Get("health")
  healthCheck() {
    return { status: "ok", timestamp: new Date().toISOString() };
  }
}
