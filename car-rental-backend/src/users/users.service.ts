import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ message: string; user: { id: number; name: string; email: string } }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email is already registered');
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
      user: {  // Ensure this structure matches the controller's expectations
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(body: {
    email: string;
    password: string;
  }): Promise<{ message: string; user: { id: number; name: string; email: string } }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user || user.password !== body.password) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      user: {  // Ensure this structure matches the controller's expectations
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async getBookingsByUserId(
    userId: number,
  ): Promise<
    {
      id: number;
      carId: number;
      userId: number;
      start_date: Date;
      end_date: Date;
    }[]
  > {
    return this.prisma.booking.findMany({
      where: {
        userId,
      },
    });
  }
}
