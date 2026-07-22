import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

import type { SecurityAlert } from "@/types/dashboard";

type Props = {
    alerts: SecurityAlert[];
};

export default function SecurityAlerts({
    alerts,
}: Props) {

    return (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

            <div className="mb-4 flex items-center gap-2">

                <AlertTriangle
                    className="text-yellow-400"
                    size={20}
                />

                <h2 className="text-lg font-semibold">
                    Security Alerts
                </h2>

            </div>

            {alerts.length === 0 ? (

                <p className="text-sm text-slate-400">

                    No security alerts 🎉

                </p>

            ) : (

                <div className="space-y-4">

                    {alerts.map((alert) => (

                        <div
                            key={`${alert.employee_id}-${alert.provider}`}
                            className="rounded-lg border border-yellow-700 bg-yellow-950/20 p-4"
                        >

                            <p className="font-medium">

                                {alert.employee_name}

                            </p>

                            <p className="mt-1 text-sm text-slate-300">

                                Still has{" "}
                                <span className="font-semibold">
                                    {alert.provider}
                                </span>{" "}
                                access.

                            </p>

                            <Link
                                to={`/employees/${alert.employee_id}`}
                                className="mt-3 inline-block text-sm font-medium text-blue-400 hover:underline"
                            >
                                View Employee →
                            </Link>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );

}