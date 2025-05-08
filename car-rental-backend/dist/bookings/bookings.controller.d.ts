import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Request } from 'express';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: CreateBookingDto, req: Request): Promise<any>;
    findAll(): Promise<any>;
    findUserBookings(req: Request): Promise<any>;
    findOne(id: string): Promise<any>;
}
