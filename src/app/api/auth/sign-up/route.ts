import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma/client';
import bcrypt from 'bcryptjs';

import { prisma } from '@/shared/lib/prisma';

type SignUpBody = {
  name?: string;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<SignUpBody>;

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const name = typeof body.name === 'string' ? body.name.trim() : null;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
      }
    }

    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
