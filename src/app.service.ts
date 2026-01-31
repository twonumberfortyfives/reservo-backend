import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    constructor() {
        ['OAUTH_CLIENT_ID', 'BACKEND_URL'].forEach(key => {
            if (!process.env[key]) {
                throw new Error(`Env variable ${key} not found!`)
            }
        })
    }
}
