# 🔐 JEBC-DeV Next.js Starter — Sistema de Autenticación Educativo

> **Arquitectura limpia de autenticación y autorización basada en roles** — Un proyecto educativo que demuestra cómo implementar **desde cero** un sistema seguro donde no todos los usuarios tienen acceso a todo, con rutas públicas, privadas y restringidas por rol.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.1-black?logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Better Auth](https://img.shields.io/badge/Better%20Auth-1.5.6-purple)](https://better-auth.js.org)
[![Prisma](https://img.shields.io/badge/Prisma-7.5.0-2d3748?logo=prisma)](https://www.prisma.io)
[![License MIT](https://img.shields.io/badge/License-MIT-green)](#licencia)

---

## 🎯 ¿Qué es este proyecto?

Un **sistema educativo de referencia** que cubre el flujo completo de identidad en una aplicación web moderna:

✅ **Registro y autenticación** con email + password  
✅ **Gestión de sesión** persistente mediante cookies seguras  
✅ **Autorización por roles** (ADMIN, USER) con rutas protegidas  
✅ **Redirecciones inteligentes** basadas en estado y permisos  
✅ **Validaciones robustas** con Zod en cliente y servidor  
✅ **Base de datos** con Prisma ORM + SQLite  
✅ **UI moderna** con shadcn/ui, Tailwind CSS v4 y animations  
✅ **Code organization** clara y escalable

**No es una plantilla lista para producción.** Es una referencia arquitectónica donde cada decisión tiene una razón detrás que puedes rastrear y aprender.

---

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Características Principales](#características-principales)
- [Instalación Rápida](#instalación-rápida)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Patrones y Convenciones](#patrones-y-convenciones)
- [Flujos de Autenticación](#flujos-de-autenticación)
- [Protección de Rutas](#protección-de-rutas)
- [Rutas Disponibles](#rutas-disponibles)
- [Inicializar Base de Datos](#inicializar-base-de-datos)
- [Contributing](#contributing)
- [Licencia](#licencia)

---

## 🛠️ Stack Tecnológico

### **Backend & Framework**

| Tecnología      | Versión | Propósito                                           |
| --------------- | ------- | --------------------------------------------------- |
| **Next.js**     | 16.2.1  | Framework React con App Router y Server Components  |
| **React**       | 19.2.4  | Librería de UI                                      |
| **TypeScript**  | 5       | Type safety en todo el código                       |
| **Better Auth** | 1.5.6   | Autenticación moderna tipo NextAuth pero más simple |
| **Prisma**      | 7.5.0   | ORM type-safe para base de datos                    |

### **Base de Datos**

| Tecnología         | Versión | Propósito                           |
| ------------------ | ------- | ----------------------------------- |
| **SQLite**         | 3       | Base de datos ligera y sin servidor |
| **better-sqlite3** | 7.6.13  | Adaptador Prisma para SQLite        |

### **Validación & Forms**

| Tecnología          | Versión | Propósito                        |
| ------------------- | ------- | -------------------------------- |
| **Zod**             | 4.3.6   | Validación de esquemas tipados   |
| **React Hook Form** | 7.72.0  | Gestión eficiente de formularios |

### **UI & Styling**

| Tecnología          | Versión | Propósito                             |
| ------------------- | ------- | ------------------------------------- |
| **Tailwind CSS**    | 4       | Utilidades CSS modernas               |
| **shadcn/ui**       | 4.1.1   | Componentes accesibles sobre Radix UI |
| **Radix UI**        | 1.4.3   | Primitivas de UI accesibles           |
| **lucide-react**    | 1.7.0   | Iconografía consistente               |
| **hugeicons-react** | 1.1.6   | Icons adicionales con diseño custom   |
| **Sonner**          | 2.0.7   | Toast notifications elegantes         |

### **Optimizaciones**

| Tecnología               | Versión | Propósito                            |
| ------------------------ | ------- | ------------------------------------ |
| **Babel React Compiler** | 1.0.0   | Compilación automática de re-renders |
| **next-themes**          | 0.4.6   | Soporte para dark/light mode         |

---

## ⚡ Características Principales

### **1. Autenticación Segura**

- ✅ Sign up / Sign in con email + password
- ✅ Validación con Zod en cliente y servidor
- ✅ Cookies seguras con Better Auth
- ✅ Auto sign-in después del registro
- 🔄 Auto-logout en sesión expirada

### **2. Autorización por Roles (RBAC)**

```
┌─ Rutas Públicas
│  ├─ / (Home)
│  ├─ /about (Stack & proyecto)
│  ├─ /login (Iniciar sesión)
│  └─ /register (Crear cuenta)
│
├─ Rutas Privadas (Requieren sesión)
│  ├─ /profile (Perfil del usuario)
│  └─ /dashboard (Admin only)
│
└─ Roles
   ├─ USER (acceso a /profile)
   └─ ADMIN (acceso a /dashboard + área admin)
```

### **3. Gestión de Sesión**

- 🔄 Persistente mediante cookies seguras
- 🛡️ CSRF protection incluida
- ⏱️ Expiración configurable
- 🔐 No almacena credenciales en cliente

### **4. Protección de Rutas**

- ✅ Validación en el servidor (antes de renderizar)
- ✅ Redirecciones automáticas según rol
- ✅ Páginas 404 personalizadas con glitch effects
- ✅ Headers contextuales (PublicHeader vs PrivateHeader)

### **5. Base de Datos Tipada**

- 📊 Esquema Prisma claro y mantenible
- 🔄 Migraciones automáticas
- 🌱 Endpoint de seed con usuarios iniciales
- 📍 Relaciones y validaciones a nivel BD

### **6. Validaciones Robustas**

```ts
// Email + contraseña validadas con Zod
// Cliente: Feedback inmediato con react-hook-form
// Servidor: Validación adicional en Server Actions
// BD: Constraints a nivel esquema
```

### **7. UX/UI Moderna**

- 🎨 Dark theme profesional con acentos emerald
- ⚡ Animaciones suaves y glitch effects
- 📱 Responsive design (mobile-first)
- 🎭 Modales, dropdowns, toasts elegantes
- 🌙 Tipografía: DM Serif Display (headers), Geist Mono (code)

---

## 🚀 Instalación Rápida

### Requisitos previos

- Node.js 18+ (recomendado 20+)
- npm

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/jebcdev/next-starter.git
cd next-starter

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crear archivo .env.local en el root con:
# DATABASE_URL="file:./dev.db"
# BETTER_AUTH_SECRET="tu-secret-aqui"
# NEXT_PUBLIC_APP_NAME="JEBC-DeV"
# NEXT_PUBLIC_APP_DESCRIPTION="..."

# 4. Generar cliente Prisma
npx prisma generate

# 5. Crear estructura de base de datos
npx prisma migrate dev --name init

# 6. Iniciar servidor de desarrollo
npm run dev

# 7. En otra terminal — poblar BD con usuarios de prueba
curl -X POST http://localhost:3000/api/seeders

# 8. Abrir en navegador
# http://localhost:3000
```

### Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo (limpia .next y reinicia)
npm run build    # Build para producción
npm run start    # Ejecutar build en producción
npm run lint     # Linting
```

### Credenciales de prueba

| Rol   | Email           | Contraseña |
| ----- | --------------- | ---------- |
| Admin | admin@admin.com | 123456789  |
| User  | user@user.com   | 123456789  |

---

## 📁 Estructura del Proyecto

```
src/
├── app/                                    # App Router (Next.js 16)
│   ├── layout.tsx                          # Layout raíz con metadata
│   ├── globals.css                         # Estilos globales + color system
│   ├── not-found.tsx                       # Página 404 personalizada
│   │
│   ├── (auth)/                             # Grupo de rutas públicas de auth
│   │   ├── layout.tsx                      # AuthLayout (decoraciones tema dark)
│   │   ├── login/page.tsx                  # 🔓 Iniciar sesión
│   │   └── register/page.tsx               # 🔓 Crear cuenta
│   │
│   ├── (public)/                           # Grupo de rutas públicas
│   │   ├── layout.tsx                      # PublicLayout + PublicHeader
│   │   ├── page.tsx                        # 🌍 Home
│   │   └── about/page.tsx                  # 📖 Stack y descripción
│   │
│   ├── (private)/                          # Grupo de rutas protegidas
│   │   ├── layout.tsx                      # PrivateLayout (redirect si no logueado)
│   │   ├── profile/page.tsx                # 👤 Perfil del usuario
│   │   └── dashboard/                      # 📊 Admin only
│   │       ├── layout.tsx                  # Protección: solo admins
│   │       └── page.tsx
│   │
│   └── api/
│       ├── auth/[...all]/route.ts          # 🔐 Better Auth endpoints
│       └── seeders/route.ts                # 🌱 Endpoint para inicializar BD
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx                   # Form: Email + Password
│   │   ├── RegisterForm.tsx                # Form: Name + Email + Password x2
│   │   └── index.ts
│   │
│   ├── public/
│   │   └── PublicHeader.tsx                # Header público (nav + auth buttons)
│   │
│   ├── private/
│   │   └── PrivateHeader.tsx               # Header privado (avatar dropdown + nav)
│   │
│   ├── profile/
│   │   └── UserProfile.tsx                 # Mostrar datos del usuario
│   │
│   └── ui/                                 # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── badge.tsx
│       ├── avatar.tsx
│       ├── select.tsx
│       ├── checkbox.tsx
│       ├── textarea.tsx
│       ├── separator.tsx
│       ├── sonner.tsx
│       └── index.ts
│
├── actions/auth/
│   ├── index.ts                            # Exports
│   ├── session-details.ts                  # ⚡ Server Action: obtener sesión actual
│   └── seed-users.ts                       # Función: crear usuarios iniciales
│
├── lib/
│   ├── auth.ts                             # 🔑 Configuración Better Auth + Prisma
│   ├── auth-client.ts                      # 🔑 Cliente Better Auth (navegador)
│   ├── prisma.ts                           # 📊 Singleton Prisma Client
│   ├── layout-metadata.ts                  # 🔍 Helpers SEO metadata
│   └── utils.ts                            # 🛠️ Utilidades (cn, etc.)
│
├── validations/auth/
│   └── auth.ts                             # 📋 Esquemas Zod (Login, Register)
│
└── generated/prisma/                       # 🤖 Cliente Prisma generado
    ├── client.ts
    ├── enums.ts                            # Role enum
    └── models/
        ├── User.ts
        ├── Session.ts
        └── ...

prisma/
├── schema.prisma                           # 📋 Definición de modelos
└── migrations/
    └── 20250327004749_init/
        └── migration.sql

.env.local                                  # 🔐 Variables (no commitear)
next.config.ts
tsconfig.json
package.json
```

---

## 🎨 Patrones y Convenciones

### **Naming Conventions**

```typescript
// 📌 Interfaces → Prefijo I
interface IUser {
  id: string
  email: string
  role: "ADMIN" | "USER"
}

interface IProps {
  user: IUser
  onLogout: () => void
}

// 📌 Types → Prefijo T
type TLoginData = z.infer<typeof LoginSchema>
type TResponse<T> = { data: T | null; error: string | null }

// 📌 Enums → Prefijo E
enum EUserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

// 📌 Funciones → camelCase con verbs
function getSessionDetails() { ... }
function handleSignOut() { ... }
function validateEmail(email: string) { ... }

// 📌 Componentes → PascalCase
export function LoginForm() { ... }
export function UserProfile() { ... }
export const PrivateHeader = ({ ... }) => { ... }

// 📌 Esquemas Zod → Suffix Schema
export const LoginSchema = z.object({...})
export const RegisterSchema = z.object({...})

// 📌 Constantes → UPPER_SNAKE_CASE
const SALT_ROUNDS = 12
const DEFAULT_PAGE_SIZE = 20
```

### **Server Actions vs Client Components**

```tsx
// ✅ Server Actions (datos sensibles)
"use server";
export async function getSessionDetails() {
    // Obtiene sesión desde servidor
    // El cliente NUNCA ve detalles sensibles
}

// ✅ Client Components (solo cuando es necesario)
"use client";
export function LoginForm() {
    // react-hook-form + zodResolver
    // Llama a authClient directamente
    // Toast feedback
    // Router navigation
}
```

### **Validación en 3 niveles**

```
1️⃣ Cliente: React Hook Form + Zod → Feedback inmediato
2️⃣ Server Action: Zod validación adicional → Error handling
3️⃣ Base de Datos: Constraints → Integridad garantizada
```

### **Estructura de Layout Groups**

El proyecto usa **layout groups** de Next.js para organizar rutas por contexto:

```
(auth)      → Rutas públicas de autenticación
(public)    → Rutas públicas generales
(private)   → Rutas protegidas (requieren sesión)
```

Cada grupo tiene su propio `layout.tsx` y headers diferentes.

---

## 🔄 Flujos de Autenticación

### **1️⃣ Flujo de REGISTRO**

```
┌─────────────────────────────┐
│  RegisterForm (Client)      │
│  "use client"               │
└────────────┬────────────────┘
             │
             ├─→ 1. renderForm()
             │   - Mostrar inputs: name, email, password, confirmPassword
             │
             ├─→ 2. handleSubmit()
             │   - zodResolver valida contra RegisterSchema
             │   - Si error: mostrar feedback en campo
             │   - Si válido: continuar
             │
             ├─→ 3. authClient.signUp.email()
             │   - POST /api/auth/sign-up/email
             │   - Envía: name, email, password
             │
             ├─→ 4. Better Auth procesa
             │   - Valida email único
             │   - Hash password con bcryptjs
             │   - Crea User en Prisma
             │   - Crea Session automáticamente
             │   - Set secure HTTP-only cookie
             │
             ├─→ 5. Client recibe sesión
             │   - toast.success("¡Cuenta creada!")
             │
             └─→ 6. router.push("/")
                   - Redirect automático
                   - Si error → toast.error()
```

### **2️⃣ Flujo de LOGIN**

```
┌──────────────────────────┐
│  LoginForm (Client)      │
│  "use client"            │
└────────┬─────────────────┘
         │
         ├─→ 1. renderForm()
         │   - Inputs: email, password
         │
         ├─→ 2. handleSubmit()
         │   - zodResolver valida LoginSchema
         │
         ├─→ 3. authClient.signIn.email()
         │   - POST /api/auth/sign-in/email
         │   - Envía: email, password
         │
         ├─→ 4. Better Auth valida
         │   - Busca User por email
         │   - bcryptjs.compare(password, hash)
         │   - Si válido: crea Session nueva
         │   - Set cookie secure en cliente
         │
         ├─→ 5. Client recibe sesión
         │   - toast.success("¡Bienvenido!")
         │
         └─→ 6. router.push("/dashboard")
               - Redirect al dashboard
```

### **3️⃣ Flujo de LOGOUT**

```
┌──────────────────────────┐
│  PrivateHeader (Client)  │
│  Avatar Dropdown         │
└────────┬─────────────────┘
         │
         └─→ handleSignOut()
             │
             ├─→ authClient.signOut()
             │   - POST /api/auth/sign-out
             │
             ├─→ Better Auth invalida
             │   - Marca Session como expirada
             │   - Delete cookie en cliente
             │
             ├─→ Client recibe confirmación
             │   - toast.info("Sesión cerrada")
             │
             └─→ router.push("/login")
                 - Redirect automático
```

### **4️⃣ Flujo de PROTECCIÓN DE RUTA**

```
Usuario accede a /dashboard
         │
         ├─→ DashboardLayout se ejecuta (Server Component)
         │
         ├─→ await getSessionDetails()
         │   - Obtiene cookie de sesión
         │   - Busca en BD: User + Session
         │   - Retorna: { isAuthenticated, isAdmin, currentUser }
         │
         ├─→ if (!isAuthenticated) redirect("/login")
         │   ✅ Redirect ANTES de renderizar
         │
         ├─→ if (!isAdmin) notFound()
         │   ✅ Muestra 404 si no es admin
         │
         └─→ Renderiza página
             ✅ Usuario garantizadamente admin
```

---

## 🔐 Protección de Rutas

### **Niveles de Protección**

| Nivel             | Dónde                  | Cómo                             | Cuándo se ejecuta   |
| ----------------- | ---------------------- | -------------------------------- | ------------------- |
| **1. Layout**     | `(private)/layout.tsx` | `redirect("/login")` en servidor | Antes de renderizar |
| **2. Page**       | Individualmente        | `notFound()` si no cumple rol    | Antes de renderizar |
| **3. Componente** | Client side            | Condicionales con sesión         | Cuando renderiza    |

### **Ejemplo: Dashboard solo para admins**

```tsx
// src/app/(private)/dashboard/layout.tsx
import { getSessionDetails } from "@/actions/auth/session-details";
import { notFound, redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // ✅ Ejecuta en servidor, antes de renderizar
    const { isAuthenticated, isAdmin } = await getSessionDetails();

    // Si no logueado → redirige a login
    if (!isAuthenticated) redirect("/login");

    // Si logueado pero no admin → muestra 404
    if (!isAdmin) notFound();

    // Si llega aquí → garantizado que es admin
    return <main>{children}</main>;
}
```

### **Rutas protegidas por defecto**

```
✅ PÚBLICAS (sin protección)
  /
  /about
  /login
  /register

🔒 PRIVADAS (requieren sesión)
  /profile             (Usuario normal puede acceder)

🔐 ADMIN ONLY (requieren sesión + rol ADMIN)
  /dashboard           (Error 404 si no eres admin)
```

---

## 🛣️ Rutas Disponibles

### **Públicas (acceso sin autenticación)**

| Ruta        | Componente   | Descripción                         |
| ----------- | ------------ | ----------------------------------- |
| `/`         | HomePage     | Página de inicio con descripción    |
| `/about`    | AboutPage    | Stack tecnológico y características |
| `/login`    | LoginForm    | Iniciar sesión                      |
| `/register` | RegisterForm | Crear nueva cuenta                  |

### **Privadas (requieren sesión)**

| Ruta         | Componente    | Descripción          | Acceso       |
| ------------ | ------------- | -------------------- | ------------ |
| `/profile`   | UserProfile   | Panel del usuario    | USER + ADMIN |
| `/dashboard` | DashboardPage | Panel administrativo | ADMIN only   |

### **API Routes**

| Ruta                 | Método | Descripción                                              |
| -------------------- | ------ | -------------------------------------------------------- |
| `/api/auth/[...all]` | POST   | Better Auth endpoints (sign up, sign in, sign out, etc.) |
| `/api/seeders`       | POST   | Inicializa BD con usuarios de prueba                     |

---

## 🌱 Inicializar Base de Datos

El proyecto no incluye scripts npm para seed. Una vez el servidor esté corriendo, ejecuta en otra terminal:

```bash
curl -X POST http://localhost:3000/api/seeders
```

Esto llama al endpoint que crea los usuarios de prueba iniciales.

### Credenciales de prueba

| Rol   | Email           | Contraseña |
| ----- | --------------- | ---------- |
| Admin | admin@admin.com | 123456789  |
| User  | user@user.com   | 123456789  |

Para visualizar la base de datos directamente:

```bash
npx prisma studio
```

Abre Prisma Studio en `http://localhost:5555` para ver y editar datos.

---

## 📊 Esquema de Base de Datos

```prisma
model User {
  id              String      @id @default(cuid())
  email           String      @unique
  name            String?
  password        String?     // Hash bcryptjs
  role            String      @default("USER")  // ADMIN | USER
  emailVerified   DateTime?
  image           String?     // Avatar URL
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  sessions        Session[]
  accounts        Account[]
}

model Session {
  id              String      @id @default(cuid())
  token           String      @unique
  expiresAt       DateTime
  userId          String
  ipAddress       String?
  userAgent       String?

  user            User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt       DateTime    @default(now())
}

model Account {
  id                String      @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String

  user              User        @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Verification {
  id          String      @id @default(cuid())
  identifier  String      // email
  value       String      // token
  expiresAt   DateTime
  createdAt   DateTime    @default(now())
}
```

---

## 💡 Patrones Frecuentes

### **Obtener sesión actual en cualquier lugar**

```tsx
import { getSessionDetails } from "@/actions/auth/session-details";

// En Server Component
const { isAuthenticated, isAdmin, currentUser, currentSession } =
    await getSessionDetails();

// Tomar decisiones basadas en rol
if (isAdmin) {
    // Mostrar opción admin
}
```

### **Usar formularios protegidos**

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type TLoginData } from "@/validations/auth/auth";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
    const form = useForm<TLoginData>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (values: TLoginData) => {
        await authClient.signIn.email(values, {
            onSuccess: () => router.push("/dashboard"),
            onError: (ctx) => toast.error(ctx.error.message),
        });
    };

    return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}
```

### **Proteger rutas con rol específico**

```tsx
// En layout o page.tsx
export default async function AdminOnlyPage() {
    const { isAdmin } = await getSessionDetails();

    if (!isAdmin) notFound();

    return <div>Panel Admin</div>;
}
```

---

## 🎓 Qué Puedes Aprender

Este proyecto es un **laboratorio educativo** ideal para entender:

✅ **Arquitectura de Next.js 16**
- App Router y layout groups
- Server Components vs Client Components
- Server Actions para backend
- API Routes vs Server Actions

✅ **Autenticación & Autorización**
- Better Auth como alternativa moderna a NextAuth
- Cookies seguras y manejo de sesiones
- RBAC (autorización por roles)
- Hash seguro con bcryptjs

✅ **Validación robusta**
- Zod schemas tipados
- Validación en cliente (react-hook-form)
- Validación en servidor (Server Actions)
- Validación en BD (constraints)

✅ **Patrones de desarrollo**
- Naming conventions escalables
- Estructura clara de carpetas
- Separación de responsabilidades
- Type safety en todo

✅ **Base de datos**
- Prisma ORM y migrations
- Relaciones y constraints
- Adaptar providers (SQLite, PostgreSQL, etc.)

✅ **UX/UI moderna**
- Tailwind CSS v4
- shadcn/ui components
- Dark mode
- Animations CSS

---

## 🤝 Contributing

¿Quieres mejorar este proyecto?

1. **Fork** el repositorio
2. **Crea rama** para tu feature (`git checkout -b feature/amazing-feature`)
3. **Commit cambios** (`git commit -m 'feat: agrega feature'`)
4. **Push a rama** (`git push origin feature/amazing-feature`)
5. **Abre Pull Request**

### **Convenciones de commits**

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(scope): descripción breve
fix(scope): descripción breve
docs(scope): descripción breve
refactor(scope): descripción breve
test(scope): descripción breve
```

---

## 📝 Licencia

Este proyecto está bajo la licencia **MIT** — básicamente, puedes usar, modificar y distribuir libremente. Ver [LICENSE](./LICENSE) para más detalles.

---

## 🔗 Enlaces Útiles

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 🔐 [Better Auth](https://better-auth.js.org)
- 📊 [Prisma ORM](https://www.prisma.io)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🧩 [shadcn/ui](https://ui.shadcn.com)
- ✔️ [Zod Validation](https://zod.dev)

---

## 👨‍💻 Autor

**JEBC-DeV**

- GitHub: [@jebcdev](https://github.com/jebcdev)
- Proyecto: [next-starter](https://github.com/jebcdev/next-starter)

---

## ✨ Agradecimientos

Este proyecto fue construido con ❤️ como referencia educativa, inspirado en arquitecturas limpias de autenticación y autorización. ¡Que sirva como base sólida para tus próximos proyectos!

**Happy coding! 🚀**