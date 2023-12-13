import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { AddMovieDto } from '../dto/add-movie.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  async findAllMovies() {
    return await this.movieRepository.find();
  }
  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto); //const newUser = new User(); newUser.username = username;
    return this.userRepository.save(newUser); // INSERT
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username }); //SELECT * from user
    if (!user) {
      return;
    }
    return user;
  }

  async getOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id }); //SELECT * from user
    if (!user) {
      throw new NotFoundException(`Not found user: ${id}`);
    }
    return user;
  }
  async checkIfFavorite(
    userId: number,
    mediaId: number,
  ): Promise<Movie | undefined> {
    try {
      const movie = await this.movieRepository.findOne({
        where: { user: { id: userId }, mediaId },
      });
      return movie;
    } catch (err) {
      throw err;
    }
  }
  async getFavoritesOfUser(id: number): Promise<Movie[] | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['movies'],
      });
      const { movies } = user;
      return movies;
    } catch (err) {
      throw err;
    }
  }

  async addFavorite(userId: number, addMovieDto: AddMovieDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['movies'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const movie = new Movie();
    Object.assign(movie, addMovieDto);
    user.movies.push(movie);
    await this.userRepository.save(user);
    return movie;
  }

  async removeFavorite(favoriteId: number) {
    const movie = await this.movieRepository.findOne({
      where: { id: favoriteId },
      relations: ['user'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${favoriteId} not found`);
    }
    movie.user = null;

    await this.movieRepository.remove(movie);
    return { message: 'Movie deleted successfully' };
  }
}

// private async preloadMovieByTitle(addMovie: AddMovieDto): Promise<Movie> {
//   const title = addMovie.title;
//   const existingMovie = await this.movieRepository.findOneBy({ title });
//   if (existingMovie) {
//     return existingMovie;
//   }
//   return this.movieRepository.create({ ...addMovie });
// }
