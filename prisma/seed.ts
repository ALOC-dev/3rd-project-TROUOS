import 'dotenv/config'; // .env의 환경변수 불러오기
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 충돌방지를 위해 기존 데이터가 있다면 삭제 
  // 아래 두 개 순서 바꾸니까 오류 발생 포함 된 거부터 삭제해야하는 듯
  await prisma.menu.deleteMany({});
  await prisma.restaurant.deleteMany({});

  //데이터 생성
  await prisma.restaurant.create({
    data: {
      name: "반지하돈부리",
      category: "일식",
      address: "서울 동대문구 망우로18다길 44",
      latitude: 37.585337,
      longitude: 127.060857,
      phone: "02-3394-8111",
      closedDays: ["saturday", "sunday"],
      openTime: "10:00~20:00",
      breakTime: "15:00~17:00",
      delivery: false,
      forHere: true,
      takeOut: true,
      
      menu: {
        create: [
          { name: "유케동", price: 11000 },
          { name: "사케동", price: 14000 },
        ],
      },
    },
  });

  await prisma.restaurant.create({
    data: {
      name: "파리바게뜨 서울시립대점",
      category: "제과점",
      address: "서울특별시 동대문구 서울시립대로 163 백주년기념관 로비",
      latitude: 37.582313,
      longitude: 127.057187,
      phone: "02-6490-5864",
      closedDays: ["saturday", "sunday"],
      openTime: "08:30~19:00",
      breakTime: null,
      delivery: false,
      forHere: false,
      takeOut: true,
      
      menu: {
        create: [
          { name: "No.1우유식빵", price: 3700  },
          { name: "부드럽고촉촉한 굿모닝롤", price: 4300 },
        ],
      },
    },
  });

  await prisma.restaurant.create({
    data: {
      name: "써브웨이 서울시립대점",
      category: "브런치",
      address: "서울 동대문구 서울시립대로 163 미래관 로비",
      latitude: 37.584563,
      longitude: 127.056938,
      phone: null,
      closedDays: ["saturday", "sunday"],
      openTime: "09:00~20:00",
      breakTime: null,
      delivery: false,
      forHere: true,
      takeOut: true,
      
      menu: {
        create: [
          { name: "이탈리안 비엠티 (15cm)", price: 8100 },
          { name: "에그마요 (15cm)", price: 6800 },
        ],
      },
    },
  });

  console.log('Seed 데이터 삽입이 완료되었습니다.');
}

//실행 결과 처리
main()
  //오류 처리
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  //prisma와 DB연결 끊기
  .finally(async () => {
    await prisma.$disconnect();
  });