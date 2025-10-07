import { Module } from '@nestjs/common';
import { AuthResolver } from './api/resolvers/auth.resolver';
import { AuthMapper } from './api/mappers/auth.mapper';
import { AuthProvider } from './infraestructure/providers/auth.provider';
import { AuthService } from './application/services/auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [...AuthProvider, AuthService, AuthResolver, AuthMapper],
  exports: [...AuthProvider, AuthService],
})
export class AuthModule {}
