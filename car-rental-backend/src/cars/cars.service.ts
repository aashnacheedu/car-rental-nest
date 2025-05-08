import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCarDto): Promise<any> {
    const car = await this.prisma.car.create({ data });
    return {
      message: 'Car created successfully',
      car,
    };
  }

  async findOne(id: number): Promise<any> {
    if (!id) {
      throw new BadRequestException('Car ID is required');
    }

    const car = await this.prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      return { message: 'Car not found' };
    }

    return car;
  }

  async update(id: number, updateDto: Partial<CreateCarDto>): Promise<any> {
    const updatedCar = await this.prisma.car.update({
      where: { id },
      data: updateDto,
    });

    return {
      message: 'Car updated successfully',
      car: updatedCar,
    };
  }

  async remove(id: number): Promise<any> {
    const deletedCar = await this.prisma.car.delete({
      where: { id },
    });

    return {
      message: 'Car deleted successfully',
      deletedCarId: deletedCar.id,
    };
  }

  async getAllCars(): Promise<any> {
    const cars = await this.prisma.car.findMany();
    return cars;
  }

  async getAvailableCars(startDate: Date, endDate: Date): Promise<any> {
    const availableCars = await this.prisma.car.findMany({
      where: {
        available: true,
        NOT: {
          bookings: {
            some: {
              AND: [
                { start_date: { lt: endDate } },
                { end_date: { gt: startDate } },
              ],
            },
          },
        },
      },
    });

    return availableCars;
  }
}
