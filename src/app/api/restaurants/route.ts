import { NextResponse } from 'next/server'; //요청에 대한 응답 생성을 위해 사용. json 형태의 응답 생성성
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

// POST (데이터 추가) 로그인 기능에 필요
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: data.name,
        category: data.category,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        phone: data.phone,
        closedDays: data.closedDays, // Prisma의 Json 타입은 배열 그대로 입력해도 됨
        openTime: data.openTime,
        breakTime: data.breakTime,
        delivery: data.delivery,
        forHere: data.forHere,
        takeOut: data.takeOut,
        
        menu: data.menu ? { create: data.menu } : undefined,
      },
      include: { menu: true },
    });

    return NextResponse.json(newRestaurant, { status: 201 }); //201 : 생성
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '데이터 생성 중 오류 발생' }, { status: 500 }); //500 : 실패
  }
}