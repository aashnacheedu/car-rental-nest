import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Request } from 'express';
import { Booking, Car } from '@prisma/client';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(data: CreateBookingDto, req: Request): Promise<{
        message: string;
        booking: Booking & {
            car: Car;
        };
    }>;
    findAll(): Promise<{
        bookings: ({
            id: number;
            end_date: Date;
            start_date: Date;
            status: string;
            userId: number;
            carId: number;
            createdAt: Date;
        } & {
            car: Car;
        })[];
    }>;
    findUserBookings(req: Request): Promise<{
        message: string;
        bookings?: undefined;
    } | {
        bookings: {
            id: number;
            start_date: Date;
            end_date: Date;
            make: string;
            model: string;
            year: number;
            color: string;
            price_per_day: number;
        }[];
        message?: undefined;
    }>;
    findOne(id: string): Promise<({
        id: number;
        end_date: Date;
        start_date: Date;
        status: string;
        userId: number;
        carId: number;
        createdAt: Date;
    } & {
        car: Car;
    }) | {
        message: string;
    }>;
}
