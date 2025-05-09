import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking, Car } from '@prisma/client';
type BookingWithCar = Booking & {
    car: Car;
};
export declare class BookingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateBookingDto & {
        userId: number;
    }): Promise<{
        message: string;
        booking: BookingWithCar;
    }>;
    findAll(): Promise<BookingWithCar[]>;
    findByUserId(userId: number): Promise<BookingWithCar[]>;
    findOne(id: number): Promise<BookingWithCar | null>;
    update(id: number, updateDto: UpdateBookingDto): Promise<{
        message: string;
        booking: BookingWithCar;
    }>;
    remove(id: number): Promise<{
        message: string;
        deletedBookingId: number;
    }>;
}
export {};
