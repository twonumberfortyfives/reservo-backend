import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { HealthzService } from "./healthz.service";
import type { Response } from 'express';

@Controller()
export class HealthzController {
    constructor(private readonly healthzService: HealthzService) {}

    @Get("healthz")
    async checkServer(@Res() res: Response): Promise<Response> {
        return res.status(HttpStatus.OK).json({
            status: await this.healthzService.checkServer()
        })
    }
}
