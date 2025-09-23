# Guia Rápido de Zod

## O que é o Zod?
O Zod é uma biblioteca de validação e tipagem para JavaScript/TypeScript. Ele garante que os dados recebidos estão no formato esperado e se integra com o TypeScript, permitindo gerar tipos automaticamente.


# Instalação

Execute o comando:

```bash
npm install zod
```
## Exemplo Simples

### Validação de string:

```typescript
import { z } from "zod";

const usernameSchema = z.string().min(3, "O nome precisa ter no mínimo 3 letras");

usernameSchema.parse("Ana"); // ■ passa
usernameSchema.parse("Jo");  // ■ erro
```
## Validando Objetos

### Exemplo de validação de login:

```typescript
const loginSchema = z.object({
  usuario: z.string().min(1, "Usuário obrigatório"),
  senha: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres")
});

loginSchema.parse({ usuario: "gustavo", senha: "123456" }); // ■ passa
```
## Tipagem Automática

### O Zod gera tipos automaticamente:

`type Login = z.infer<typeof loginSchema>;`

## Arrays e Enums
```typescript
const numbers = z.array(z.number());
numbers.parse([1, 2, 3]);
const roles = z.enum(["admin", "user", "guest"]); 
roles.parse("admin");
roles.parse("root"); // ■ erro
```
## Regras Personalizadas

```typescript 
const idadeSchema = z.number().int().positive().refine((idade) => idade >= 18, {
message: "Precisa ser maior de 18 anos" }); idadeSchema.parse(20);
idadeSchema.parse(15); // ■ erro
```
## Resumindo

- `z.string()`, `z.number()`, `z.boolean()` → tipos básicos.
- `z.object({...})` → objetos com validação.
- `z.array(tipo)` → listas.
- `z.enum([...])` → valores fixos.
- `refine()` → validações personalizadas.
- `infer` → gera tipos automaticamente para TypeScript.
