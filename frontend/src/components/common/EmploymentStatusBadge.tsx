import { Badge } from "@/components/ui/badge";

type Props = {
    status: string;
};

export default function EmploymentStatusBadge({
    status,
}: Props) {

    const active = status === "ACTIVE";

    return (
        <Badge
            className={
                active
                    ? "bg-green-500/15 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                    : "bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/20"
            }
        >
            <span className="mr-2">
                {active ? "●" : "●"}
            </span>

            {active ? "Active" : "Offboarded"}
        </Badge>
    );
}