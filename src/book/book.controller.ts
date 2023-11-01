import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '../schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, } from '@nestjs/swagger';

@ApiTags('book')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
@Controller('books')
export class BookController {
    constructor(private bookService: BookService) { }

    /** 
     *
     * @returns {Book[]} Devuelve una lista de libros
     * @param {Request} query Lista de parámetros para filtrar
     */
    @Get()
    @ApiOperation({ summary: 'Obtener lista de libros' })
    @ApiResponse({
        status: 200,
        description: 'Lista de libros'
    })
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.bookService.findAll(query);
    }



    /**
    * Crea un nuevo libro y devuelve el libro creado.
    * @param {book} Datos del libro que se creará
    * @param {req} Objeto de solicitud para obtener información del usuario autenticado
    * @returns  {Object} El libro creado
    */
    @Post()
    @UseGuards(AuthGuard())
    @ApiOperation({ summary: 'Crear un libro' })
    @ApiResponse({
        status: 201,
        description: 'Libro creado exitosamente'
    })
    async createBook(@Body()
    book: CreateBookDto,
        @Req() req,
    ): Promise<Book> {

        return this.bookService.create(book, req.user);
    }



    /**
     * Obtiene un libro por su ID.
     * @param {id} Identificador único del libro
     * @returns {Object} El libro encontrado
     */
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un libro por su ID' })
    @ApiResponse({
        status: 200,
        description: 'Libro encontrado exitosamente'
    })
    async getBook(
        @Param('id')
        id: string
    ): Promise<Book> {
        return this.bookService.findById(id);
    }



    /**
       * Actualiza un libro por su ID.
       * @param {id} Identificador único del libro
       * @param {book} Datos actualizados del libro
       * @returns {Object} El libro actualizado
       */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un libro por su ID' })
    @ApiResponse({
        status: 200,
        description: 'Libro actualizado exitosamente'
    })
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        book: UpdateBookDto,
    ): Promise<Book> {
        return this.bookService.updateById(id, book);
    }



    /**
     * Elimina un libro por su ID.
     * @param {id} Identificador único del libro
     * @returns {Object} El libro eliminado
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un libro por su ID' })
    @ApiResponse({
        status: 200,
        description: 'Libro eliminado exitosamente'
    })
    async deleteBook(
        @Param('id')
        id: string,
    ): Promise<Book> {
        return this.bookService.deleteById(id)
    }
}
