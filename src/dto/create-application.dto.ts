import { IsEmail, IsNotEmpty, IsArray, ArrayUnique, ValidateNested, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { Address } from './address.dto'

export class CreateApplication {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  birthDate: string

  @IsString()
  @IsNotEmpty()
  ssn: string

  @IsArray()
  @ArrayUnique((address: Address) => JSON.stringify(address || {}))
  @ValidateNested({ each: true })
  @Type(() => Address)
  addresses: Address[]

  @IsString()
  @IsNotEmpty()
  income: string
}
