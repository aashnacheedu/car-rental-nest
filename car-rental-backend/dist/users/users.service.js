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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(userData) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email is already registered');
        }
        const user = await this.prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            },
        });
        return {
            message: 'Registration successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
    async login(body) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (!user || user.password !== body.password) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        return {
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
    async getBookingsByUserId(userId) {
        return this.prisma.booking.findMany({
            where: {
                userId,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map