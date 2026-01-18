import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    generateLoginUrl(): string {
        return "login url"
    }
}