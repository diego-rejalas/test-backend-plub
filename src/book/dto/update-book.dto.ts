import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../../schemas/book.schema";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {

    @ApiProperty({ example: 'One Piece Live Action' })
    @IsOptional()
    @IsString()
    readonly title: string;

    @ApiProperty({ example: 'Boat Adventures...' })
    @IsOptional()
    @IsString()
    readonly description: string;

    @ApiProperty({ example: '250' })
    @IsOptional()
    @IsNumber()
    readonly price: number;

    @ApiProperty({ example: 'Adventure' })
    @IsOptional()
    @IsEnum(Category, { message: 'Please enter correct category' })
    readonly category: Category;

    @ApiProperty({ example: 'Eiichirō Oda' })
    @IsOptional()
    @IsString()
    readonly author: string;

    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;
}