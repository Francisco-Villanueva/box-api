import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkEnvVariables } from 'config/envCheck';

const morgan = require('morgan');

async function bootstrap() {
  await checkEnvVariables();

  const app = await NestFactory.create(AppModule);
  
  app.use(morgan('tiny'));
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
  });
}
bootstrap();
