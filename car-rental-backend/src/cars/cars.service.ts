import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from '@prisma/client';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCarDto): Promise<{ message: string; car: Car }> {
    const car = await this.prisma.car.create({ data });
    return {
      message: 'Car created successfully',
      car,
    };
  }

  async findOne(id: number): Promise<Car | { message: string }> {
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

  async update(id: number, updateDto: Partial<CreateCarDto>): Promise<{ message: string; car: Car }> {
    const updatedCar = await this.prisma.car.update({
      where: { id },
      data: updateDto,
    });

    return {
      message: 'Car updated successfully',
      car: updatedCar,
    };
  }

  async remove(id: number): Promise<{ message: string; deletedCarId: number }> {
    const deletedCar = await this.prisma.car.delete({
      where: { id },
    });

    return {
      message: 'Car deleted successfully',
      deletedCarId: deletedCar.id,
    };
  }

  async getAllCars(): Promise<Car[]> {
    return this.prisma.car.findMany();
  }

  async getAvailableCars(startDate: Date, endDate: Date): Promise<Car[]> {
    return this.prisma.car.findMany({
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
  }
}
