"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
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
            throw new common_1.BadRequestException('Car is already booked for the selected dates.');
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
    async findAll() {
        const bookings = await this.prisma.booking.findMany({
            include: { car: true },
        });
        return bookings;
    }
    async findByUserId(userId) {
        const bookings = await this.prisma.booking.findMany({
            where: { userId },
            include: { car: true },
        });
        return bookings;
    }
    async findOne(id) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { car: true },
        });
        return booking;
    }
    async update(id, updateDto) {
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
    async remove(id) {
        const deleted = await this.prisma.booking.delete({
            where: { id },
        });
        return {
            message: 'Booking deleted',
            deletedBookingId: deleted.id,
        };
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map