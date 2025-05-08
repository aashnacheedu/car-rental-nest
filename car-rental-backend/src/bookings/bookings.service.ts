import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBookingDto & { userId: number }): Promise<any> {
    const overlappingBooking = await this.prisma.booking.findFirst({
      where: {
        carId: data.carId,
        OR: [
          {
            start_date: {
              lte: new Date(data.endDate),
            },
            end_date: {
              gte: new Date(data.startDate),
            },
          },
        ],
      },
    });

    if (overlappingBooking) {
      throw new BadRequestException('Car is already booked for the selected dates.');
    }

    const booking = await this.prisma.booking.create({
      data: {
        userId: data.userId,
        carId: data.carId,
        start_date: new Date(data.startDate),
        end_date: new Date(data.endDate),
      },
      include: {
        car: true,
      },
    });

    return {
      message: 'Booking created successfully',
      booking,
    };
  }

  async findAll(): Promise<any> {
    const bookings = await this.prisma.booking.findMany({
      include: { car: true },
    });
    return bookings;
  }

  async findByUserId(userId: number): Promise<any> {
    const bookings = await this.prisma.booking.findMany({
      where: { userId },
      include: { car: true },
    });
    return bookings;
  }

  async findOne(id: number): Promise<any> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { car: true },
    });
    return booking;
  }

  async update(id: number, updateDto: UpdateBookingDto): Promise<any> {
    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: updateDto,
      include: { car: true },
    });
    return {
      message: 'Booking updated successfully',
      booking: updatedBooking,
    };
  }

  async remove(id: number): Promise<any> {
    const deleted = await this.prisma.booking.delete({
      where: { id },
    });
    return {
      message: 'Booking deleted',
      deletedBookingId: deleted.id,
    };
  }
}
