import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /**
    * Registra un nuevo usuario y devuelve un token de autenticación.
    * @param {signUpDto} Datos de registro del usuario
    * @returns {string}} que contiene un token de autenticación
    */
    @Post('/signup')
    @ApiOperation({ summary: 'Registro de usuario' })
    @ApiResponse({
        status: 201,
        description: 'Usuario registrado exitosamente'
    })
    signUp(@Body() SignUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(SignUpDto);
    }



    /**
     * Inicia sesión y devuelve un token de autenticación.
     * @param loginDto Datos de inicio de sesión del usuario
     * @returns {string} contiene un token de autenticación
     */
    @Post('/login')
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({
        status: 200,
        description: 'Inicio de sesión exitoso'

    })
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }
}
