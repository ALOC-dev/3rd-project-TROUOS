import nodemailer from 'nodemailer'
import redisClient from '@/lib/redis'
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email } = await req.json()

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 인증 코드 생성
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // Redis에 5분(300초) TTL로 코드 저장
    await redisClient.set(email, code, { EX: 300 })

    // 이메일 전송
    const transporter = nodemailer.createTransport({
        host: 'mail.uos.ac.kr',
        port: 587,
        secure: false, // SMTP 연결은 암호화 안 된 상태로 시작 -> 이후 nodemailer가 자동으로 STARTTLS로 암호화 연결
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS,  
        },
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '[이시대맛집] 회원가입 인증 코드',
        text: `인증번호는 ${code} 입니다.`,
    }

    try {
        await transporter.sendMail(mailOptions)
        return NextResponse.json({ success: true, code }, { status: 200 });
    }
    catch (error) {
        console.error('메일 전송 오류:', error)
        return new Response(JSON.stringify({ success: false }), { status: 500 })
    }
}