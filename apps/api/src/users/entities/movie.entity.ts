import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum MediaType {
  Movie = 'movie',
  TVShow = 'tv',
}

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  mediaId: number;

  @Column({
    type: 'enum',
    enum: MediaType,
    default: MediaType.Movie,
  })
  mediaType: MediaType;

  @Column({ type: 'float' })
  rate: Number;

  @Column()
  poster: string;

  @ManyToOne((type) => User, (user) => user.movies)
  user: User;
}
