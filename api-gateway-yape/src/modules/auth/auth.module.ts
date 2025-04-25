import { Module } from '@nestjs/common';
import { AuthController } from './infraestructure/controllers/auth.controller';
import { AuthProvider } from './infraestructure/providers/auth.provider';
import { AuthService } from './application/services/auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [...AuthProvider, AuthService],
  exports: [...AuthProvider, AuthService],
})
export class AuthModule {}
