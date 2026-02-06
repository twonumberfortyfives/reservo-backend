import { Module } from '@nestjs/common';
import { AuthController } from './oauth.controller';
import { AuthService } from './oauth.service';
import { AlsModule } from 'src/shared/als.module';

@Module({
    imports: [AlsModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
