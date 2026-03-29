"use client";

// components/auth/login-form.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type TLoginData,
    LoginSchema,
} from "@/validations/auth/auth";
import { SingleFormError } from "@/components/ui";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TLoginData>({
        resolver: zodResolver(LoginSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: TLoginData) => {
        await authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
                callbackURL: "/",
            },
            {
                onRequest: () => {
                    toast.info("Verificando credenciales...", {
                        description: "Por favor espera un momento.",
                        position: "top-left",
                        duration: 1000,
                    });
                },
                onSuccess: () => {
                    toast.success("¡Sesión iniciada!", {
                        description: "Serás redirigido al inicio.",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    });
                    reset();
                    router.push("/");
                },
                onError: () => {
                    
                    toast.error("Error al iniciar sesión", {
                        description: "Correo o contraseña incorrectos.",
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
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
                        Iniciar sesión
                    </span>
                </div>

                <h1
                    className="text-3xl font-black text-white tracking-tight leading-none mb-2"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                    Bienvenido
                    <br />
                    <span className="text-emerald-400">de vuelta.</span>
                </h1>
                <p className="text-sm text-zinc-500 mt-3">
                    Accede con tus credenciales para continuar.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                        <SingleFormError message={errors.email.message} />
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label
                            htmlFor="password"
                            className="text-xs font-mono text-zinc-400 uppercase tracking-widest"
                        >
                            Contraseña
                        </Label>
                        <Link
                            href="/forgot-password"
                            className="text-xs text-zinc-600 hover:text-emerald-400 font-mono transition-colors"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••••••"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600
                                   focus:border-emerald-500 focus:ring-0 focus-visible:ring-0
                                   focus-visible:ring-offset-0 focus-visible:border-emerald-500
                                   rounded-sm h-11 font-mono text-sm transition-colors"
                        {...register("password")}
                    />
                    {errors.password && (
                        <SingleFormError message={errors.password.message} />
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
                    {isSubmitting ? "Ingresando..." : "Ingresar →"}
                </Button>

                {/* Divider */}
                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-black px-3 text-xs text-zinc-600 font-mono">
                            ¿No tienes cuenta?
                        </span>
                    </div>
                </div>

                {/* Register link */}
                <Link href="/register">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 border-zinc-800 bg-transparent text-zinc-400
                                   hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-700
                                   font-mono text-sm tracking-widest uppercase rounded-sm transition-all"
                    >
                        Crear cuenta
                    </Button>
                </Link>
            </form>
        </div>
    );
}