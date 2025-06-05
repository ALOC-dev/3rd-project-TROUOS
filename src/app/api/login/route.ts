import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
    const { userId, password } = await request.json()

    const user = await prisma.user.findUnique({ where: { userId } })
    if (!user) {
        return NextResponse.json({ message: '존재하지 않는 ID입니다.' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return NextResponse.json({ message: '비밀번호가 틀렸습니다.' }, { status: 401 })
    }

    // 로그인 성공
    return NextResponse.json({ message: '로그인에 성공하였습니다.', userId: user.userId, name: user.name })
}
