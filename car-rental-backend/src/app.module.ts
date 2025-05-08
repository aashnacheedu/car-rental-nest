import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { CarsModule } from './cars/cars.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'car-rental-frontend'),
    }),
    UsersModule,
    CarsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
