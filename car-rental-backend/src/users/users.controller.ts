import { Controller, Get, Post, Body, BadRequestException, UnauthorizedException, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }): Promise<any> {
    if (!body.name || !body.email || !body.password) {
      throw new BadRequestException('All fields (name, email, password) are required');
    }

    const result = await this.usersService.register(body);
    return { message: 'User registered successfully', user: result };
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
  ): Promise<any> {
    if (!body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.usersService.login(body);
    req.session.userId = user.userId;
    console.log('User logged in, session userId:', req.session.userId);

    return { message: 'Login successful', userId: user.userId };
  }

  @Get('session')
  async getSession(@Req() req: Request): Promise<any> {
    if (!req.session?.userId) {
      throw new UnauthorizedException('Not logged in');
    }

    return { message: 'User is logged in', userId: req.session.userId };
  }

  @Get('my-bookings')
  @UseGuards(AuthGuard)
  async getMyBookings(@Req() req: Request): Promise<any> {
    const bookings = await this.usersService.getBookingsByUserId(req.session.userId!);
    return { message: 'User bookings fetched', bookings };
  }

  @Post('logout')
  async logout(@Req() req: Request): Promise<any> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject({ message: 'Error logging out' });
        else resolve({ message: 'Logged out successfully' });
      });
    });
  }
}