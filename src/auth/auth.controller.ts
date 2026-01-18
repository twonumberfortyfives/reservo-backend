import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import type { Response } from 'express';
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("login")
    generateLoginUrl(@Res() res: Response) {
        return this.authService.generateLoginUrl() 
    }    
}
