import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/services/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersService } from './users/services/users.service';
import { AddMovieDto } from './users/dto/add-movie.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('user/signin')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }
  @Post('user/signup')
  register(@Body() body): any {
    return this.authService.signup(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/info')
  getHello(@Request() req): string {
    return req.user;
  }

  //////////////////////////////////////////////////////////////////////////
  @UseGuards(JwtAuthGuard)
  @Get('user/favorites')
  async getFavoritesOfUser(@Request() req) {
    return await this.usersService.getFavoritesOfUser(req.user.payload.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user/favorites')
  async addFavoriteToUser(
    @Request() req: any,
    @Body() addMovieDto: AddMovieDto,
  ) {
    return this.usersService.addFavorite(req.user.payload.sub, addMovieDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/favorites/:favoriteId')
  async removeFavorite(@Param('favoriteId') favoriteId: number) {
    return await this.usersService.removeFavorite(favoriteId);
  }

  /////////////////////////////////////////////////////////////////////////
}
