import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type StatCardProps = {
    title: string;
    value: string | number;
    subtitle: string;
    icon: ReactNode;
};

export default function StatCard({
    title,
    value,
    subtitle,
    icon,
}: StatCardProps) {
    return (
        <Card className="
rounded-3xl
border
border-slate-800
bg-gradient-to-br
from-slate-900
to-slate-950
p-7
shadow-lg
hover:-translate-y-1
hover:border-blue-500/50
">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-slate-400 text-sm">
                        {title}
                    </p>

                    <h2 className="mt-4 text-5xl font-bold tracking-tight">
                        {value}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {subtitle}
                    </p>

                </div>

                <div className="
rounded-2xl
bg-blue-500/10
border
border-blue-500/20
p-4
">

                    {icon}

                </div>

            </div>

        </Card>
    );
}