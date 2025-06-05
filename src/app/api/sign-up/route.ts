import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs';

interface RequestBody {
    userId: string;
    name: string;
    password: string;
}

export async function POST(request: Request) {
    try{
        const body: RequestBody = await request.json()
        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(body.password, 10)
        // 중복 체크
        const existingUser = await prisma.user.findUnique({
            where: {
                userId: body.userId,
            },
        })
        if (existingUser) {
            return new Response('이미 존재하는 아이디입니다.', { status: 409 })
        }

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
    catch(error){
        console.error('Sign-up error: ', error)
        return new Response('Internal Server Error', { status: 500 })
    }
}