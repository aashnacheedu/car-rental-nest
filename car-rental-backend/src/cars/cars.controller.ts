import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('available')
  async getAvailableCars(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ): Promise<any> {
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
  async getAllCars(): Promise<any> {
    const cars = await this.carsService.getAllCars();
    return {
      message: 'All cars fetched successfully',
      cars,
    };
  }
}
