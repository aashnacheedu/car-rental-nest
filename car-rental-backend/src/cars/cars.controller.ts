import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from '@prisma/client';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('available')
  async getAvailableCars(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ): Promise<{ message: string; cars: Car[] }> {
    if (!startDate || !endDate) {
      throw new BadRequestException('Both startDate and endDate are required.');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format.');
    }

    if (start >= end) {
      throw new BadRequestException('Start date must be before end date.');
    }

    const cars = await this.carsService.getAvailableCars(start, end);
    return {
      message: 'Available cars fetched successfully',
      cars,
    };
  }

  @Get('all')
  async getAllCars(): Promise<{ message: string; cars: Car[] }> {
    const cars = await this.carsService.getAllCars();
    return {
      message: 'All cars fetched successfully',
      cars,
    };
  }
}
