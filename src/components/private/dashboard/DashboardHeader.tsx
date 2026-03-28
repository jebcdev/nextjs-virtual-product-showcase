

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardHeaderAction {
    label: string;
    href: string;
    icon: LucideIcon;
}

interface DashboardHeaderProps {
    title: string;
    subtitle?: string;
    action?: DashboardHeaderAction;
    className?: string;
}

export const DashboardHeader = ({
    title,
    subtitle,
    action,
    className,
}: DashboardHeaderProps) => {
    return (
        <div
            className={cn(
                "flex items-start justify-between gap-4 pb-6 border-b border-zinc-800",
                className,
            )}
        >
            {/* Texts */}
            <div className="flex flex-col gap-1">
                <h1
                    className="text-2xl font-black text-white tracking-tight"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Action button */}
            {action && (
                <Button
                    asChild
                    size="sm"
                    className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs tracking-widest uppercase rounded-sm gap-2"
                >
                    <Link href={action.href}>
                        <action.icon className="w-4 h-4" />
                        {action.label}
                    </Link>
                </Button>
            )}
        </div>
    );
};