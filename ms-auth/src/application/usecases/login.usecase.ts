import { injectable } from "inversify";
import logger from "../../utils/logger";
import { TYPES } from "../../infraestructure/providers/types";
import { AuthRepository } from "../../domain/repository/auth.repository";
import { inject } from "inversify";
import jwt from "jsonwebtoken";
import { UserPayload } from "../../domain/interfaces/user-payload.interface";
import bcrypt from "bcrypt";
import { UnauthorizedError } from "../../utils/error";

@injectable()
export class LoginUseCase {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepository) {}
  
  async execute(username: string, password: string) {
    try {
        const user = await this.authRepository.getUserByUsername(username);
        if (!user) {
          throw new UnauthorizedError("Invalid credentials");
        }
  
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedError("Invalid credentials");
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, key: user.key } as UserPayload,
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );
        
        return {token};
                
    } catch (error) {
        logger.error(`Error during login: ${error}`);
        if (error instanceof UnauthorizedError) {
            throw error;
        }
        throw new Error("Login failed");
    }
  }
}
