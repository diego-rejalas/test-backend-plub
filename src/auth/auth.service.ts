import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService

    ) { }

    async signUp(SignUpDto: SignUpDto): Promise<{ token: string }> {
        try {
            const { name, email, password } = SignUpDto;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.userModel.create({
                name,
                email,
                password: hashedPassword
            })

            const token = this.jwtService.sign({ id: user._id });

            return { token };
        } catch (error) {
            if (error?.code === 11000) {
                throw new ConflictException('Duplicate Email Entered')
            }
        }

    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMached = await bcrypt.compare(password, user.password);

        if (!isPasswordMached) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }

}
