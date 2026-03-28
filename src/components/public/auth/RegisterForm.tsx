"use client";

// components/auth/register-form.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type TRegisterData,
    RegisterSchema,
} from "@/validations/auth/auth";
import { SingleFormError } from "@/components/ui";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function RegisterForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TRegisterData>({
        resolver: zodResolver(RegisterSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: TRegisterData) => {
        const { error } = await authClient.signUp.email(
            {
                email: data.email,
                password: data.password,
                name: data.name,
                callbackURL: "/dashboard",
            },
            {
                onRequest: () => {
                    toast.info("Creando tu cuenta...", {
                        description: "Por favor espera un momento.",
                        position: "top-left",
                        duration: 1000,
                    });
                },
                onSuccess: () => {
                    toast.success("¡Cuenta creada exitosamente!", {
                        description: "Serás redirigido al dashboard.",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    });
                    reset();
                    router.push("/");
                },
                onError: (ctx) => {
                    toast.error("Error al crear la cuenta", {
                        description: "Intenta nuevamente con otro correo o revisa tu conexión.",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
            },
        );
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
                        Nuevo acceso
                    </span>
                </div>

                <h1
                    className="text-3xl font-black text-white tracking-tight leading-none mb-2"
                    style={{
                        fontFamily:
                            "'DM Serif Display', Georgia, serif",
                    }}
                >
                    Crear
                    <br />
                    <span className="text-emerald-400">cuenta.</span>
                </h1>
                <p className="text-sm text-zinc-500 mt-3">
                    Completa los datos para registrarte en el sistema.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                {/* Nombre completo */}
                <div className="space-y-2">
                    <Label
                        htmlFor="name"
                        className="text-xs font-mono text-zinc-400 uppercase tracking-widest"
                    >
                        Nombre completo
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Juan Pérez"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600
                                   focus:border-emerald-500 focus:ring-0 focus-visible:ring-0
                                   focus-visible:ring-offset-0 focus-visible:border-emerald-500
                                   rounded-sm h-11 font-mono text-sm transition-colors"
                        {...register("name")}
                    />
                    {errors.name && (
                        <SingleFormError
                            message={errors.name.message}
                        />
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label
                        htmlFor="email"
                        className="text-xs font-mono text-zinc-400 uppercase tracking-widest"
                    >
                        Correo electrónico
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="usuario@correo.com"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600
                                   focus:border-emerald-500 focus:ring-0 focus-visible:ring-0
                                   focus-visible:ring-offset-0 focus-visible:border-emerald-500
                                   rounded-sm h-11 font-mono text-sm transition-colors"
                        {...register("email")}
                    />
                    {errors.email && (
                        <SingleFormError
                            message={errors.email.message}
                        />
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label
                        htmlFor="password"
                        className="text-xs font-mono text-zinc-400 uppercase tracking-widest"
                    >
                        Contraseña
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600
                                   focus:border-emerald-500 focus:ring-0 focus-visible:ring-0
                                   focus-visible:ring-offset-0 focus-visible:border-emerald-500
                                   rounded-sm h-11 font-mono text-sm transition-colors"
                        {...register("password")}
                    />
                    {errors.password && (
                        <SingleFormError
                            message={errors.password.message}
                        />
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label
                        htmlFor="passwordConfirmation"
                        className="text-xs font-mono text-zinc-400 uppercase tracking-widest"
                    >
                        Confirmar contraseña
                    </Label>
                    <Input
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Repite tu contraseña"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600
                                   focus:border-emerald-500 focus:ring-0 focus-visible:ring-0
                                   focus-visible:ring-offset-0 focus-visible:border-emerald-500
                                   rounded-sm h-11 font-mono text-sm transition-colors"
                        {...register("passwordConfirmation")}
                    />
                    {errors.passwordConfirmation && (
                        <SingleFormError
                            message={
                                errors.passwordConfirmation.message
                            }
                        />
                    )}
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-emerald-500 hover:bg-emerald-400 text-black font-bold
                               font-mono text-sm tracking-widest uppercase rounded-sm transition-all
                               hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-[0.99]
                               disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting
                        ? "Registrando..."
                        : "Registrarse →"}
                </Button>

                {/* Divider */}
                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-black px-3 text-xs text-zinc-600 font-mono">
                            ¿Ya tienes cuenta?
                        </span>
                    </div>
                </div>

                {/* Login link */}
                <Link href="/login">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 border-zinc-800 bg-transparent text-zinc-400
                                   hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-700
                                   font-mono text-sm tracking-widest uppercase rounded-sm transition-all"
                    >
                        Iniciar sesión
                    </Button>
                </Link>
            </form>
        </div>
    );
}
