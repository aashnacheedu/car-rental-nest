import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  app.useGlobalPipes(new ValidationPipe());
  const expressApp = app.getHttpAdapter().getInstance(); 

  expressApp.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret_key', 
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, 
      maxAge: 1000 * 60 * 60 * 24,  // session expiry: 1 day
    },
  }));

  app.enableCors({
    origin: 'http://localhost:5000', 
    credentials: true,  
  });

  expressApp.use(bodyParser.json());

  const frontendPath = join(__dirname, '..', '..', '..', 'car-rental-frontend');
  expressApp.use(express.static(frontendPath));


  expressApp.get('/register', (req, res) => {
    res.sendFile(join(frontendPath, 'register.html'));
  });

  expressApp.get('/login', (req, res) => {
    res.sendFile(join(frontendPath, 'login.html'));
  });

  const port = process.env.PORT ?? 5000;
  await app.listen(port);
  console.log(`🚗 Car rental app is running at http://localhost:${port}`);
}

bootstrap();
