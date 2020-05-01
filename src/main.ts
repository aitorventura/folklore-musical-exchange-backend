import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  var bodyParser = require('body-parser')
  app.enableCors(); 
  app.use(bodyParser.json({limit: '10mb', extended: true}))
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
  await app.listen(3001);
}
bootstrap();
