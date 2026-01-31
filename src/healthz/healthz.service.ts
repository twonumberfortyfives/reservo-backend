import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthzService {
    async checkServer(): Promise<string> {
        return 'All is good!';
    }
}