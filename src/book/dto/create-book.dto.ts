
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../../schemas/book.schema"
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {

    @ApiProperty({ example: 'One Piece' })
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @ApiProperty({ example: 'Boat Adventures...' })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({ example: '250' })
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @ApiProperty({ example: 'Adventure' })
    @IsNotEmpty()
    @IsEnum(Category, { message: 'Please enter correct category' })
    readonly category: Category;

    @ApiProperty({ example: 'Eiichirō Oda' })
    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;
}