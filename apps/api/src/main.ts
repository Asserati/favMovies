// import * as passport from 'passport';
// import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SocketIOAdapter } from './socket-io-adapter';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const logger = new Logger('Main (main.ts)');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // enables for not specifying types, with the type decorator
      },
    }),
  );
  const configService = app.get(ConfigService);
  const clientPort = configService.get('CLIENT_PORT');
  const port = parseInt(configService.get('PORT'));
  app.enableCors({
    origin: [
      `http://localhost:${clientPort}`,
      // new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
    ],
  });
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));
  await app.listen(port);
  logger.log(`Server running on port ${port}`);
}
bootstrap();

// app.use(
//   session({
//     secret: 'secret-hide',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 3600000 },
//   }),
// );

// app.use(passport.initialize());
// app.use(passport.session());
