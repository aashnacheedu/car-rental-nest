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
exports.CarsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CarsService = class CarsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const car = await this.prisma.car.create({ data });
        return {
            message: 'Car created successfully',
            car,
        };
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('Car ID is required');
        }
        const car = await this.prisma.car.findUnique({
            where: { id },
        });
        if (!car) {
            return { message: 'Car not found' };
        }
        return car;
    }
    async update(id, updateDto) {
        const updatedCar = await this.prisma.car.update({
            where: { id },
            data: updateDto,
        });
        return {
            message: 'Car updated successfully',
            car: updatedCar,
        };
    }
    async remove(id) {
        const deletedCar = await this.prisma.car.delete({
            where: { id },
        });
        return {
            message: 'Car deleted successfully',
            deletedCarId: deletedCar.id,
        };
    }
    async getAllCars() {
        return this.prisma.car.findMany();
    }
    async getAvailableCars(startDate, endDate) {
        return this.prisma.car.findMany({
            where: {
                available: true,
                NOT: {
                    bookings: {
                        some: {
                            AND: [
                                { start_date: { lt: endDate } },
                                { end_date: { gt: startDate } },
                            ],
                        },
                    },
                },
            },
        });
    }
};
exports.CarsService = CarsService;
exports.CarsService = CarsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CarsService);
//# sourceMappingURL=cars.service.js.map