import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AlsModule } from 'src/shared/als.module';

@Module({
    imports: [AlsModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
