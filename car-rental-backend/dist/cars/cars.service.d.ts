import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from '@prisma/client';
export declare class CarsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCarDto): Promise<{
        message: string;
        car: Car;
    }>;
    findOne(id: number): Promise<Car | {
        message: string;
    }>;
    update(id: number, updateDto: Partial<CreateCarDto>): Promise<{
        message: string;
        car: Car;
    }>;
    remove(id: number): Promise<{
        message: string;
        deletedCarId: number;
    }>;
    getAllCars(): Promise<Car[]>;
    getAvailableCars(startDate: Date, endDate: Date): Promise<Car[]>;
}
