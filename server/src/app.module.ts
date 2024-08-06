import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConfiguration from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './common/guards/authCheak.guard';
import { TaskModule } from './tasks/task.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: DatabaseConfiguration,
    }),
    UsersModule,
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
//   implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude(
//         { path: '/auth/signup', method: RequestMethod.POST },
//         { path: '/auth/signin', method: RequestMethod.POST },
//         { path: '/auth/refresh', method: RequestMethod.GET },
//       )
//       .forRoutes('');
//   }
// }
