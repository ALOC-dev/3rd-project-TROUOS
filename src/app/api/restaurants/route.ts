import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET (데이터 조회)
export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: { menu: true },
    });
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '데이터 조회 중 오류 발생' }, { status: 500 });
  }
}

// POST (데이터 추가) 로그인 기능에 필요요
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

    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '데이터 생성 중 오류 발생' }, { status: 500 });
  }
}
