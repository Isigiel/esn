import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { Logger, ValidationPipe } from '@nestjs/common';
import { handleToken } from './middleware/jwt';
import { assignTennant } from './middleware/tennant';

const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.use(handleToken());
  app.use(assignTennant());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}
bootstrap();
