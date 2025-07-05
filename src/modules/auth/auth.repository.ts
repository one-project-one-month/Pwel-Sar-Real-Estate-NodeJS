import { IAuthRepository } from "./interfaces/auth.repo.interface";
import { injectable } from "tsyringe";
import { prisma } from "libs/prismaClients";
import { AgentProfile } from "entities/index";
import { User } from "../../entities/index";
import bcrypt from "bcrypt";
import { AppError } from "utils/error-handling";
import {
  AgentRegisterRequestDto,
  UserRegistrationRequestDto,
} from "./dtos/auth.request.dto";

@injectable()
export class AuthRepository implements IAuthRepository {
  // register agent profile (with status pending)
  async createPendingAgent(
    agent: AgentRegisterRequestDto,
    userId: number
  ): Promise<AgentProfile> {
    const matchedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!matchedUser) {
      throw AppError.new("notFound", "No user record found.");
    }

    const newAgent = await prisma.agentProfile.create({
      data: {
        cnaNumber: agent.cnaNumber,
        licenseNumber: agent.licenseNumber,
        userId: matchedUser.id,
        isApproved: false,
      },
    });
    return newAgent;
  }

  // register user
  async registerUserAsync(req: UserRegistrationRequestDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(req.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: req.username,
        email: req.email,
        password: hashedPassword,
        photo: req.photo,
        roleId: req.roleId,
      },
    });

    if (!newUser) {
      throw AppError.new("internalErrorServer", "Failed to create a new user.");
    }

    const user = new User({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      roleId: newUser.roleId,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      photo: newUser.photo,
    });
    return user;
  }

  // approve agent registration (only admins with permission)
  async approveAgentRegistration(
    agentId: number,
    approvingAdminId: number
  ): Promise<AgentProfile> {
    const existingAgent = await prisma.agentProfile.findUnique({
      where: { id: agentId },
    });

    if (!existingAgent) {
      throw AppError.new("notFound", "No registration record found.");
    }

    const updatedAgent = await prisma.agentProfile.update({
      where: { id: agentId },
      data: {
        isApproved: true,
        approvedById: approvingAdminId,
        approvedAt: new Date(),
      },
    });

    const agentProfile = new AgentProfile({
      id: updatedAgent.id,
      userId: updatedAgent.userId,
      cnaNumber: updatedAgent.cnaNumber,
      licenseNumber: updatedAgent.licenseNumber,
      isApproved: updatedAgent.isApproved,
      approvedAt: updatedAgent.approvedAt,
      approvedById: updatedAgent.approvedById,
    });

    return agentProfile;
  }
}
