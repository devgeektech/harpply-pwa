# Signup API – What Code Goes in Which File

Use this as a checklist. Each section = one file. The code shown is what the **signup** API needs in that file.

---

## 1. `prisma/schema.prisma`

**Role:** Defines the User table so signup can save a user.

**Code that must be there (you already have it):**

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(INDIVIDUAL)
  createdAt DateTime @default(now())

  @@schema("auth")
}

enum Role {
  ADMIN
  EMPLOYER
  INDIVIDUAL
  @@schema("auth")
}
```

---

## 2. `src/modules/auth/dto/request/sign-up.dto.ts`

**Role:** Defines the request body for signup (email, password, role) and validates it.

**Code that must be there:**

```ts
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';
import { ERROR_MESSAGES } from '../../../../common/constants/error-messages';

export class SignUpDto {
  @IsEmail({}, { message: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED })
  email: string;

  @IsString()
  @MinLength(8, { message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
  password: string;

  @IsEnum(Role, { message: ERROR_MESSAGES.AUTH.INVALID_ROLE })
  @IsNotEmpty({ message: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD.replace('{FIELD}', 'ROLE') })
  role: Role;
}
```

---

## 3. `src/modules/auth/auth.service.ts`

**Role:** Signup logic: check duplicate email, hash password, create user, create JWT, return token + user.

**Code you need for signup (the `signUp` method and constructor):**

- **Constructor:** inject `PrismaService` and `JwtService`.
- **Method `signUp(dto: SignUpDto)`:**  
  1. Get `email`, `password`, `role` from `dto`.  
  2. `this.prisma.user.findUnique({ where: { email } })` — if found, throw `ConflictException(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS)`.  
  3. `bcrypt.hash(password, 10)` → `hashedPassword`.  
  4. `this.prisma.user.create({ data: { email, password: hashedPassword, role }, select: { id: true, email: true, role: true, createdAt: true } })` → `user`.  
  5. `this.jwtService.sign({ sub: user.id, email: user.email, role })` → `token`.  
  6. `return { accessToken: token, user };`

**Imports you need:**  
`Injectable`, `JwtService`, `bcrypt`, `PrismaService`, `SignUpDto`, `ConflictException`, `ERROR_MESSAGES`.

---

## 4. `src/modules/auth/auth.controller.ts`

**Role:** Exposes the route **POST /auth/register** and calls the service.

**Code you need for signup:**

- Class decorated with `@Controller('auth')`.
- Constructor: inject `AuthService`.
- One method:
  - `@Post('register')`
  - `@HttpCode(HttpStatus.CREATED)`
  - `async register(@Body() dto: SignUpDto) { return this.authService.signUp(dto); }`

**Imports you need:**  
`Body`, `Controller`, `HttpCode`, `HttpStatus`, `Post`, `AuthService`, `SignUpDto`.

---

## 5. `src/modules/auth/auth.module.ts`

**Role:** Registers the auth controller, service, Prisma, and JWT so signup works.

**Code that must be there:**

```ts
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-very-secure-secret-1234567890',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
```

**Imports:** `Module`, `AuthService`, `AuthController`, `JwtModule`, `PrismaService`.

---

## 6. `src/app.module.ts`

**Role:** Loads the auth feature so the signup route exists.

**Code you need:** In the `imports` array, include `AuthModule`:

```ts
imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  AuthModule,
  UserModule,
],
```

---

## Summary Table

| File | What you add for signup |
|------|-------------------------|
| `prisma/schema.prisma` | `User` model + `Role` enum |
| `auth/dto/request/sign-up.dto.ts` | `SignUpDto` class with email, password, role + validators |
| `auth/auth.service.ts` | `signUp(dto)` method + Prisma + JwtService in constructor |
| `auth/auth.controller.ts` | `register` method with `@Post('register')` and `@Body() dto: SignUpDto` |
| `auth/auth.module.ts` | `AuthController`, `AuthService`, `PrismaService`, `JwtModule.register(...)` |
| `app.module.ts` | `AuthModule` in `imports` |

---

## How to test

- **URL:** `POST http://localhost:3001/auth/register` (or your app port)
- **Body (JSON):**  
  `{ "email": "test@example.com", "password": "password123", "role": "INDIVIDUAL" }`
- **Success:** 201 with `{ "accessToken": "...", "user": { "id", "email", "role", "createdAt" } }`

Your project already has all of this; use this doc to verify each file or when you add a new API using the same pattern.
