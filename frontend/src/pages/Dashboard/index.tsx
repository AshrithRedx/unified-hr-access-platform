import { useEffect, useState } from "react";

import {
    Users,
    UserCheck,
    UserX,
    ShieldCheck,
} from "lucide-react";

import RecentActivity from "@/components/dashboard/RecentActivity";
import PlatformHealth from "@/components/dashboard/PlatformHealth";
import StatCard from "@/components/dashboard/StatCard";

import { getDashboardSummary } from "@/api/employeeApi";

import type { DashboardSummary } from "@/types/dashboard";

export default function Dashboard() {

    const [summary, setSummary] =
        useState<DashboardSummary | null>(null);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data =
                    await getDashboardSummary();

                setSummary(data);

            } catch (error) {

                console.error(
                    "Failed to load dashboard:",
                    error,
                );

            }

        }

        loadDashboard();

    }, []);

    if (!summary) {

        return (

            <div className="flex h-full items-center justify-center">

                <p className="text-slate-400">

                    Loading dashboard...

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold tracking-tight">

                    Good Afternoon, Ashrith 👋

                </h1>

                <p className="mt-2 text-slate-400">

                    Enterprise Identity Lifecycle Overview

                </p>

            </div>

            {/* KPI Cards */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Employees"
                    value={summary.total_employees}
                    subtitle="Registered employees"
                    icon={<Users size={24} />}
                />

                <StatCard
                    title="Active"
                    value={summary.active_employees}
                    subtitle="Currently employed"
                    icon={<UserCheck size={24} />}
                />

                <StatCard
                    title="Offboarded"
                    value={summary.offboarded_employees}
                    subtitle="Former employees"
                    icon={<UserX size={24} />}
                />

                <StatCard
                    title="Provisioned Accounts"
                    value={summary.provisioned_accounts}
                    subtitle="Across all providers"
                    icon={<ShieldCheck size={24} />}
                />

            </div>

            {/* Bottom Cards */}

            <div className="grid gap-6 xl:grid-cols-2">

                <RecentActivity
    activities={summary.recent_activity}
/>

                <PlatformHealth />

            </div>

        </div>

    );

}