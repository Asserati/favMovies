import { TmdbModule } from './tmdb/tmdb.module';
import { TmdbService } from './tmdb/tmdb.service';
import { TmdbController } from './tmdb/tmdb.controller';
import { GatewayModule } from './gateway/gateway.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'betmonas',
      database: 'moviedb',
      entities: [User],
      // entities: ['dist/src/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    GatewayModule,
    UsersModule,
    AuthModule,
    TmdbModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
