import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs';

interface RequestBody {
    userId: string;
    name: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(body.password, 10)

    const user = await prisma.user.create({
    data: {
        userId: body.userId,
        name: body.name,
        password: hashedPassword,
    },
    })

  // 비밀번호 제외한 데이터 반환
    const { password, ...result } = user
    return new Response(JSON.stringify(result), { status: 201 })
}