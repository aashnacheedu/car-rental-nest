import { CarsService } from './cars.service';
import { Car } from '@prisma/client';
export declare class CarsController {
    private readonly carsService;
    constructor(carsService: CarsService);
    getAvailableCars(startDate: string, endDate: string): Promise<{
        message: string;
        cars: Car[];
    }>;
    getAllCars(): Promise<{
        message: string;
        cars: Car[];
    }>;
}
