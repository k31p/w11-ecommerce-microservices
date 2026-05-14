import { Controller, Get } from "@nestjs/common";

@Controller("shipments")
export class HealthController {
  @Get("health")
  healthCheck() {
    return { status: "ok", timestamp: new Date().toISOString() };
  }
}
