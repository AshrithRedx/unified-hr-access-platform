import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    getEmployee,
    getEmployeeAccess,
    getEmployeeAudit,
    offboardEmployee,
} from "@/api/employeeApi";

import type { Employee } from "@/types/employee";

import type { AccessRecord } from "@/types/accessRecord";

import AccessRecordCard from "@/components/access/AccessRecordCard";

import type { AuditLog } from "@/types/auditLog";

import AuditTimeline from "@/components/audit/AuditTimeline";

import { toast } from "sonner";


export default function EmployeeProfile() {

    const { id } = useParams();

    const navigate = useNavigate();4

    async function handleOffboard() {

    if (!id) return;

    try {

        await offboardEmployee(id);

        toast.success(
            "Employee successfully offboarded."
        );

        window.location.reload();

    } catch {

        toast.error(
            "Failed to offboard employee."
        );

    }

}

    const [employee, setEmployee] = useState<Employee | null>(null);

    const [accessRecords, setAccessRecords] = useState<AccessRecord[]>([]);
    
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

    useEffect(() => {

        async function loadEmployee() {

            if (!id) return;

            const employeeData = await getEmployee(id);

            const accessData = await getEmployeeAccess(id);

            const auditData = await getEmployeeAudit(id);

            setEmployee(employeeData);

            setAccessRecords(accessData);

            setAuditLogs(auditData);
        }

        loadEmployee();

    }, [id]);

    if (!employee) {

        return <p>Loading employee...</p>;

    }

    return (

        <div className="space-y-8">

            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />

                Back

            </Button>

            <div className="flex items-center gap-6">

                <Avatar className="h-20 w-20">

                    <AvatarFallback className="text-xl">

                        {employee.first_name.charAt(0)}
                        {employee.last_name.charAt(0)}

                    </AvatarFallback>

                </Avatar>

                <div>

                    <h1 className="text-4xl font-bold">

                        {employee.first_name} {employee.last_name}

                    </h1>

                    <p className="mt-2 text-slate-400">

                        {employee.designation}

                    </p>

                    <p className="text-slate-400">

                        {employee.department}

                    </p>

                    <Badge className="mt-4 bg-green-600">

                        {employee.employment_status}

                    </Badge>

                </div>

            </div>
                    <AccessRecordCard
            records={accessRecords}
        />

        <AuditTimeline
    logs={auditLogs}
/>
        <div className="flex justify-end">

            <Button
                variant="destructive"
                onClick={handleOffboard}
            >

                Offboard Employee

            </Button>

        </div>
        </div>

    );

}