import {
    UserPlus,
    UserMinus,
    ShieldCheck,
    Activity,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import type { DashboardActivity } from "@/types/dashboard";

type Props = {
    activities: DashboardActivity[];
};

function getActivityIcon(action: string) {

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

function formatTime(date: string) {

    const now = new Date();

    const then = new Date(date);

    const seconds = Math.floor(
        (now.getTime() - then.getTime()) / 1000,
    );

    if (seconds < 60) {

        return "Just now";

    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {

        return `${minutes} min ago`;

    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {

        return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    }

    const days = Math.floor(hours / 24);

    if (days === 1) {

        return "Yesterday";

    }

    if (days < 7) {

        return `${days} days ago`;

    }

    return then.toLocaleDateString();

}

export default function RecentActivity({
    activities,
}: Props) {

    return (

        <Card className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-semibold">

                Recent Employee Activity

            </h2>

            <div className="space-y-5">

                {activities.length === 0 ? (

                    <p className="text-slate-400">

                        No recent activity.

                    </p>

                ) : (

                    activities.map((activity, index) => {

                        const Icon = getActivityIcon(
                            activity.action,
                        );

                        return (

                            <div
                                key={index}
                                className="flex items-center gap-4"
                            >

                                <div
                                    className={`
                                        rounded-xl
                                        p-3
                                        ${
                                            activity.action === "EMPLOYEE_CREATED"
                                                ? "bg-green-500/15"
                                                : activity.action === "EMPLOYEE_OFFBOARDED"
                                                ? "bg-red-500/15"
                                                : "bg-blue-500/15"
                                        }
                                    `}
                                >

                                    <Icon
                                        size={18}
                                        className={
                                            activity.action === "EMPLOYEE_CREATED"
                                                ? "text-green-400"
                                                : activity.action === "EMPLOYEE_OFFBOARDED"
                                                ? "text-red-400"
                                                : "text-blue-400"
                                        }
                                    />

                                </div>

                                <div className="flex-1">

                                    <p className="font-medium">

                                        {activity.message}

                                    </p>

                                    <p className="text-sm text-slate-400">

                                        {formatTime(
                                            activity.occurred_at,
                                        )}

                                    </p>

                                </div>

                            </div>

                        );

                    })

                )}

            </div>

        </Card>

    );

}