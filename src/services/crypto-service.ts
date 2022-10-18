import bcrypt from "bcrypt"

export const generateHash = async (password: string, salt?: string) => {
    const passwordSalt = salt || await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, passwordSalt)
    return passwordSalt + ":" + passwordHash
}
export const checkHash = async (passwordHash: string, pass: string) => {
    const [salt] = passwordHash.split(':')
    return passwordHash === await generateHash(pass, salt)
}
