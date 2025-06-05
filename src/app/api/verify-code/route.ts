import redisClient from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { email, code } = await req.json()
    if (!email || !code) {
        return NextResponse.json({ error: 'Missing email or code' }, { status: 400 })
    }

    const savedCode = await redisClient.get(email)

    if (savedCode && savedCode === code) {
        // 인증 성공하면 코드 삭제
        await redisClient.del(email)
        return NextResponse.json({ success: true }, { status: 200 })
    }
    return NextResponse.json({ success: false, error: '인증 실패' }, { status: 400 })
}
