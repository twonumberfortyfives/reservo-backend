import { Module } from '@nestjs/common';
import { HealthzModule } from './healthz/healthz.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HealthzModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
