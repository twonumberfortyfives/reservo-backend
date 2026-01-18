import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthzService {
    checkServer(): string {
        return 'All is good!';
    }
}