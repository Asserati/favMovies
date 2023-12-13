import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PaginationQueryDto } from './pagination-query.dto';
import { UsersService } from 'src/users/services/users.service';
import { TmdbService } from './tmdb.service';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';
import { SearchQueryDto } from './search-query.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller()
export class TmdbController {
  constructor(
    private userService: UsersService,
    private tmdbService: TmdbService,
    private jwtService: JwtService,
    private configService: ConfigService, // Inject ConfigService
  ) {}

  //////////////////////////////////////////////////////////////////////////////////
  @Get('/list/:mediaType/:mediaCategory')
  async getList(
    @Query() query: PaginationQueryDto,
    @Param('mediaCategory') mediaCategory: string,
    @Param('mediaType') mediaType: string,
    @Res() res: Response,
  ) {
    try {
      const { page } = query;
      const listObservable = await this.tmdbService.getMediaList({
        mediaType,
        mediaCategory,
        page,
      });
      const response = await firstValueFrom(listObservable);
      res.json(response.data);
    } catch (err) {
      console.error('Error in getList:', err);

      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
      }
    }
  }

  @Get('genres/:mediaType')
  async getGenres(@Param() params, @Res() res: Response) {
    try {
      const { mediaType } = params;

      const mediaObservable = await this.tmdbService.getMediaGenres({
        mediaType,
      });
      const response = await firstValueFrom(mediaObservable);
      res.json(response.data);
    } catch (err) {
      throw err;
    }
  }

  @Get('search/:mediaType')
  async search(
    @Query() querys: SearchQueryDto,
    @Param() params,
    @Res() res: Response,
  ) {
    try {
      const { mediaType } = params;
      const { query, page } = querys;

      const searchObservable = await this.tmdbService.getMediaSearch({
        query,
        page,
        mediaType: mediaType === 'people' ? 'person' : mediaType,
      });

      const response = await firstValueFrom(searchObservable);

      res.json(response.data);
    } catch (err) {
      return err;
    }
  }
  @Get('detail/:mediaType/:mediaId')
  async getDetail(
    @Param('mediaId') mediaId: number,
    @Param('mediaType') mediaType: string,
    @Req() req,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const params = { mediaType, mediaId };
      const mediaObservable = this.tmdbService.getMediaDetail(params);
      const mediaResponse = await firstValueFrom(mediaObservable);
      const media = mediaResponse.data;
      const videosObservable = this.tmdbService.getMediaVideos(params);
      const videosResponse = await firstValueFrom(videosObservable);
      media.videos = videosResponse.data;

      const recommendObservable = this.tmdbService.getMediaRecommend(params);
      const recommendResponse = await firstValueFrom(recommendObservable);
      media.recommend = recommendResponse.data.results;
      const token = req.headers.authorization?.replace('Bearer ', '') || null;
      if (token) {
        const decodedToken = this.jwtService.verify(token, {
          secret: this.configService.get<string>('SECRET'),
        });
        const userId = decodedToken.sub;

        const isFavorite = await this.userService.checkIfFavorite(
          userId,
          mediaId,
        );
        media.isFavorite = isFavorite !== null;
      } else {
        media.isFavorite = false;
      }

      res.json(media);
    } catch (err) {
      return err;
    }
  }
}
