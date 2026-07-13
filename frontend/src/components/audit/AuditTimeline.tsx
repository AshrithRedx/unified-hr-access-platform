import { Card } from "@/components/ui/card";

import type { AuditLog } from "@/types/auditLog";

type Props = {
    logs: AuditLog[];
};

export default function AuditTimeline({
    logs,
}: Props) {

    return (

        <Card className="rounded-2xl border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-semibold">

                Audit Timeline

            </h2>

            <div className="space-y-6">

                {logs.map((log) => (

                    <div
                        key={log.id}
                        className="flex gap-4"
                    >

                        <div className="flex flex-col items-center">

                            <div className="h-3 w-3 rounded-full bg-blue-500" />

                            <div className="mt-1 h-full w-px bg-slate-700" />

                        </div>

                        <div className="pb-6">

                            <p className="font-medium">

                                {log.message}

                            </p>

                            <p className="text-sm text-slate-400">

                                {new Date(
                                    log.occurred_at
                                ).toLocaleString()}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </Card>

    );

}