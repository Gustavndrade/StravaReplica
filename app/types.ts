import { z } from "zod";

export const loginSchema = z.object({
    user: z.string().min(1, "Usuário obrigatório"),
    password: z.string().min(1, "Senha obrigatório"),
})