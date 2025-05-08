import { IsString, IsInt, IsBoolean, IsOptional, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsOptional()
  @IsString()
  number_plate: string;

  @IsNumber()
  @Min(1) 
  price_per_day: number;

  @IsBoolean()
  available: boolean;
}
