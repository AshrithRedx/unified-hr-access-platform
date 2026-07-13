import { Card } from "@/components/ui/card";

const services = [
    "Backend API",
    "PostgreSQL Database",
    "Provisioning Services",
];

export default function PlatformHealth() {
    return (
        <Card className="rounded-2xl border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-semibold">
                Platform Health
            </h2>

            <div className="space-y-5">

                {services.map((service) => (

                    <div
                        key={service}
                        className="flex items-center justify-between"
                    >

                        <span>
                            {service}
                        </span>

                        <div className="flex items-center gap-2">

                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

                            <span className="text-green-400">
                                Healthy
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </Card>
    );
}