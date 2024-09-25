import { IsISO31661Alpha2, IsNotEmpty, IsOptional, IsString, IsUppercase } from 'class-validator'

export class Address {
  @IsString()
  @IsNotEmpty()
  zipCode: string

  @IsString()
  @IsNotEmpty()
  type: string

  @IsString()
  @IsNotEmpty()
  @IsISO31661Alpha2()
  country: string

  @IsString()
  @IsUppercase()
  @IsNotEmpty()
  state: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsNotEmpty()
  address1: string

  @IsString()
  @IsOptional()
  address2?: string
}
