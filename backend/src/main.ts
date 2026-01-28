import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ControllerAdviceFilter } from './common/filters/controleradvice.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const uploadPath = join(process.cwd(), 'uploads/projects');
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
    console.log(`Pasta criada em: ${uploadPath}`);
  }

  app.useGlobalFilters(new ControllerAdviceFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder().setTitle('Kingdom of freelas').setDescription('A freelancer platform that aims to correct common mistakes made by others..')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'Authorization', description: 'Informe o token JWT', in: 'header' }, 'jwt').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, { swaggerOptions: { persistAuthorization: true } });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
