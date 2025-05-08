import { CarsService } from './cars.service';
export declare class CarsController {
    private readonly carsService;
    constructor(carsService: CarsService);
    getAvailableCars(startDate: string, endDate: string): Promise<any>;
    getAllCars(): Promise<any>;
}
