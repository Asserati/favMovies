import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Movie])],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
  controllers: [],
})
export class UsersModule {}
