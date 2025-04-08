//데이터베이스 접근 설정
//prisma client를 싱글톤 패턴으로 초기화하여 여러 컴포넌트나 API 라이트에서 재사용할 수 있도록 설정
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}