import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from '../schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) { }

    async findAll(query: Query): Promise<Book[]> {
        const { keyword, page } = query;
        const resPerPage = 2;
        const currentPage = Number((page)) || 1;
        const skip = resPerPage * (currentPage - 1);

        const keyWord = keyword ? {
            title: {
                $regex: keyword,
                $options: 'i'
            }
        } : {};
        
        const books: Book[] = await this.bookModel.find({ ...keyWord }).limit(resPerPage).skip(skip);
        return books;
    }

    async create(book: Book, user: User): Promise<Book> {
        const data = Object.assign(book, { user: user._id });

        const newBook = await this.bookModel.create(data);
        return newBook;
    }

    async findById(id: string): Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id);
    
        if (!isValidId) {
          throw new BadRequestException('Please enter correct id.');
        }
    
        const book = await this.bookModel.findById(id);
    
        if (!book) {
          throw new NotFoundException('Book not found.');
        }
    
        return book;
      }

    async updateById(id: string, book: Book): Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete(id);
    }
}
