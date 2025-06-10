import { NextResponse } from 'next/server'; //요청에 대한 응답 생성을 위해 사용. json 형태의 응답 생성
import { prisma } from '@/lib/prisma'; // pisam client를 가져와서 데이터베이스에 접근

// GET (데이터 조회)
export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({ //prisma의 findMany 메서드. restaurant 레코드 조회.
      include: { menu: true }, //관련된 menu 데이터도 포함
    });
    return NextResponse.json(restaurants, { status: 200 }); //가져온 데이터를 JSON 응답으로 변환 HTTP 상태코드 200 : 성공
    //예외 처리
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '데이터 조회 중 오류 발생' }, { status: 500 });
  }
}
