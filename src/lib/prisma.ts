//데이터베이스 접근 설정
//prisma client를 싱글톤 패턴으로 초기화하여 여러 컴포넌트나 API 라이트에서 재사용할 수 있도록 설정
import { PrismaClient } from '@prisma/client'

//전역 변수 설정 prisma 속성을 추가할 수 있도록 type assertion
const globalForPrisma = global as unknown as { prisma: PrismaClient }

//인스턴스 생성
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    //로깅 옵션 : 쿼리, 정보, 경고, 에러를 콘솔에 출력
    log: ['query', 'info', 'warn', 'error'],
  })

//개발 모드인 경우 globalForPrisma에 인스턴스 연결. 재로딩 시 연결 중복 생성을 막아줌
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}