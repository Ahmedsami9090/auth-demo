import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()
export const hashData: (data: string) => Promise<string> = async (data) => {
    const rounds = configService.get<number>('ROUNDS')
    const hash = await bcrypt.hash(data, +rounds!)
    return hash
}

export const hashCompare: (data: string, hash: string) => Promise<boolean> = async (data, hash) => {
    return await bcrypt.compare(data, hash)
}