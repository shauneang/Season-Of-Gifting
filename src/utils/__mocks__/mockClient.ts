import { PrismaClient } from '@prisma/client'
import { mockDeep, mockClear, DeepMockProxy, mockReset } from 'jest-mock-extended'
import prisma from '../client'
import seed from '../../../prisma/seed'

jest.mock('../client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const  prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
