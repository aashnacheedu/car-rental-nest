import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
export declare class CarsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCarDto): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateDto: Partial<CreateCarDto>): Promise<any>;
    remove(id: number): Promise<any>;
    getAllCars(): Promise<any>;
    getAvailableCars(startDate: Date, endDate: Date): Promise<any>;
}
