import { prisma } from '@/lib/prisma'

interface RequestBody {
    userId: string;
    name: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    const user = await prisma.user.create({
    data: {
        userId: body.userId,
        name: body.name,
        password: body.password, // 실제 서비스에서는 반드시 해시화
    },
    })

  // 비밀번호 제외한 데이터 반환
    const { password, ...result } = user
    return new Response(JSON.stringify(result), { status: 201 })
}