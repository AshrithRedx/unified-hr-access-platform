import { useEffect, useMemo, useState } from "react";

import {
    Activity,
    ShieldCheck,
    UserMinus,
    UserPlus,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { getAuditLogs } from "@/api/employeeApi";

import type { GlobalAuditLog } from "@/types/audit";

function icon(action: string) {

    switch (action) {

        case "EMPLOYEE_CREATED":
            return UserPlus;

        case "EMPLOYEE_OFFBOARDED":
            return UserMinus;

        case "ACCOUNT_PROVISIONED":
        case "ACCOUNT_REVOKED":
            return ShieldCheck;

        default:
            return Activity;

    }

}

function badge(action: string) {

    switch (action) {

        case "EMPLOYEE_CREATED":
            return "bg-green-500/20 text-green-400";

        case "EMPLOYEE_OFFBOARDED":
            return "bg-red-500/20 text-red-400";

        default:
            return "bg-blue-500/20 text-blue-400";

    }

}

function relative(date: string) {

    const diff =
        Date.now() -
        new Date(date).getTime();

    const mins =
        Math.floor(diff / 60000);

    if (mins < 1)
        return "Just now";

    if (mins < 60)
        return `${mins} min ago`;

    const hrs =
        Math.floor(mins / 60);

    if (hrs < 24)
        return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;

    const days =
        Math.floor(hrs / 24);

    if (days === 1)
        return "Yesterday";

    return `${days} days ago`;

}

export default function Audit() {

    const [logs, setLogs] =
        useState<GlobalAuditLog[]>([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        getAuditLogs()
            .then(setLogs)
            .catch(console.error);

    }, []);

    const filtered =
        useMemo(() => {

            return logs.filter(log =>
                log.employee_name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase(),
                    ) ||
                log.action
                    .toLowerCase()
                    .includes(
                        search.toLowerCase(),
                    ),
            );

        }, [logs, search]);

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Audit Logs

                </h1>

                <p className="mt-2 text-slate-400">

                    Organization-wide employee activity.

                </p>

            </div>

            <Input
                placeholder="Search employee or action..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <Card className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                <div className="space-y-6">

                    {filtered.map(log => {

                        const Icon =
                            icon(log.action);

                        return (

                            <div
                                key={log.id}
                                className="flex gap-4 border-b border-slate-800 pb-6 last:border-0"
                            >

                                <div className="rounded-xl bg-blue-500/10 p-3">

                                    <Icon className="text-blue-400" />

                                </div>

                                <div className="flex-1">

                                    <div className="flex items-center gap-3">

                                        <p className="font-semibold">

                                            {log.employee_name}

                                        </p>

                                        <Badge
                                            className={badge(log.action)}
                                        >

                                            {log.action.replaceAll("_", " ")}

                                        </Badge>

                                    </div>

                                    <p className="mt-1 text-slate-300">

                                        {log.message}

                                    </p>

                                    <p className="mt-2 text-sm text-slate-500">

                                        {relative(log.occurred_at)}

                                    </p>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </Card>

        </div>

    );

}