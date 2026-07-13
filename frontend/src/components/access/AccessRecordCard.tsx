import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import type { AccessRecord } from "@/types/accessRecord";

type Props = {
    records: AccessRecord[];
};

export default function AccessRecordCard({
    records,
}: Props) {

    return (

        <Card className="rounded-2xl border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-semibold">

                Access Records

            </h2>

            <div className="space-y-4">

                {records.map((record) => (

                    <div
                        key={record.id}
                        className="flex items-center justify-between"
                    >

                        <div>

                            <p className="font-medium">

                                {record.provider}

                            </p>

                            <p className="text-sm text-slate-400">

                                {record.external_user_id}

                            </p>

                        </div>

                        <Badge
                            className={
                                record.status === "SUCCESS"

                                    ? "bg-green-600"

                                    : "bg-red-600"
                            }
                        >

                            {record.status}

                        </Badge>

                    </div>

                ))}

            </div>

        </Card>

    );

}