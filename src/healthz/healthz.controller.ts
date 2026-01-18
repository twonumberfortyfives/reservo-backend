import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { HealthzService } from "./healthz.service";
import type { Response } from 'express';

@Controller()
export class HealthzController {
    constructor(private readonly healthzService: HealthzService) {}

    @Get("healthz")
    checkServer(@Res() res: Response): Response {
        return res.status(HttpStatus.OK).json({
            status: this.healthzService.checkServer()
        })
    }
}
