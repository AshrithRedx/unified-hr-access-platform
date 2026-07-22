import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { AccessRecord } from "@/types/accessRecord";

type Props = {
    records: AccessRecord[];
    
    onProvision: (provider: string) => void;

    onRevoke: (provider: string) => void;
};

export default function AccessRecordCard({
    records,
    onProvision,
    onRevoke,
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

                        <div className="flex items-center gap-3">

                            <Badge
                                className={
                                    record.status === "SUCCESS"
                                        ? "bg-green-600"
                                        : "bg-red-600"
                                }
                            >
                                {record.status}
                            </Badge>

                            {record.status === "REVOKED" ? (
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        onProvision(record.provider)
                                    }
                                >
                                    Provision
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() =>
                                        onRevoke(record.provider)
                                    }
                                >
                                    Revoke
                                </Button>
                            )}

                        </div>

                    </div>

                ))}

            </div>

        </Card>

    );

}