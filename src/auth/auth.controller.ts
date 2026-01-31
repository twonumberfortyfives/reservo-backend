import { Controller, Get, Post } from "@nestjs/common";
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginUrlResponseDto } from "./dto/login-url-response.dto";

@Controller("oauth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("login")
    async login(res: Request): Promise<LoginUrlResponseDto> {
        return this.authService.generateLoginUrl();
    }
    
    @Post("logout")
    async logout(res: Request) {
        return
    }

    @Get("callback")
    async callback(res: Request) {
        return this.authService.handleCallback(res);
    }
}
