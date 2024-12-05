import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetUsersDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.auth.register(createUserDto);
  }

  async findAll({ page = 1, limit = 10, q = '' }: GetUsersDto) {
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      OR: [
        { nama: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ],
    };

    const [total, users] = await this.prisma.$transaction([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        omit: { password: true },
        where,
        take: limit,
        skip,
      }),
    ]);

    const totalPages = total ? Math.ceil(total / limit) : 1;

    return {
      data: users,
      total,
      total_pages: totalPages,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        nama: updateUserDto.nama,
        email: updateUserDto.email,
        pic: updateUserDto.pic,
      },
    });

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException(
        `User with ID ${id} not found or already deleted`,
      );
    }

    if (user.role === '1') {
      throw new ForbiddenException('Admin cant be deleted');
    }

    await this.prisma.user.delete({ where: { id } });

    return user;
  }

  findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }
}
