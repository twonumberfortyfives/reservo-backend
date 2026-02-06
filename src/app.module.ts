import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { HealthzModule } from './healthz/healthz.module';
import { AuthModule } from './oauth/auth.module';
import { AppService } from './app.service';
import { CsrfMiddleware } from './middlewares/csrf.middleware';

@Module({
  imports: [
    HealthzModule, 
    AuthModule,
    ConfigModule.forRoot({isGlobal: true})
  ],
  providers: [AppService],
  controllers: [],
})
export class AppModule implements NestModule{
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CsrfMiddleware)
      .forRoutes('*path');
  }
}
