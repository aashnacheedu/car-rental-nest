import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateBookingDto & {
        userId: number;
    }): Promise<any>;
    findAll(): Promise<any>;
    findByUserId(userId: number): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateDto: UpdateBookingDto): Promise<any>;
    remove(id: number): Promise<any>;
}
