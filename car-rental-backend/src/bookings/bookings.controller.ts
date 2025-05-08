import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
  import { BookingsService } from './bookings.service';
  import { CreateBookingDto } from './dto/create-booking.dto';
  import { UpdateBookingDto } from './dto/update-booking.dto';
  import { Request } from 'express';
  
  @Controller('bookings')
  export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}
  
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createBookingDto: CreateBookingDto, @Req() req: Request): Promise<any> {
      const userId = req.session?.userId;
  
      if (!userId) {
        throw new UnauthorizedException('User not logged in');
      }
  
      return await this.bookingsService.create({
        ...createBookingDto,
        userId,
      });
    }
  
    @Get()
    async findAll(): Promise<any> {
      const bookings = await this.bookingsService.findAll();
      return { bookings };
    }
  
    @Get('user')
    async findUserBookings(@Req() req: Request): Promise<any> {
      const userId = req.session?.userId;
  
      if (!userId) {
        throw new UnauthorizedException('User not logged in');
      }
  
      const bookings = await this.bookingsService.findByUserId(userId);
  
      if (!bookings || bookings.length === 0) {
        return { message: 'No bookings found.' };
      }
  
      return {
        bookings: bookings.map((booking) => ({
          id: booking.id,
          start_date: booking.start_date,
          end_date: booking.end_date,
          make: booking.car.make,
          model: booking.car.model,
          year: booking.car.year,
          color: booking.car.color,
          price_per_day: booking.car.price_per_day,
        })),
      };
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<any> {
      const booking = await this.bookingsService.findOne(+id);
      if (!booking) {
        return { message: 'Booking not found' };
      }
      return booking;
    }
  }