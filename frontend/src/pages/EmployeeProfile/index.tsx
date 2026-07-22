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
    provisionEmployeeAccess,
    revokeEmployeeAccess,
} from "@/api/employeeApi";

import type { Employee } from "@/types/employee";

import type { AccessRecord } from "@/types/accessRecord";

import AccessRecordCard from "@/components/access/AccessRecordCard";

import type { AuditLog } from "@/types/auditLog";

import AuditTimeline from "@/components/audit/AuditTimeline";

import { toast } from "sonner";


export default function EmployeeProfile() {

    const { id } = useParams();

    const navigate = useNavigate();

    async function handleOffboard() {

    if (!id) return;

    try {

        await offboardEmployee(id);

        toast.success(
            "Employee successfully offboarded."
        );

        await loadEmployee();

    } catch {

        toast.error(
            "Failed to offboard employee."
        );

    }

}

    async function handleProvision(provider: string) {

    if (!id) return;

    try {

        const response = await provisionEmployeeAccess(
            id,
            provider,
        );

        toast.success(response.message);

        await loadEmployee();

    } catch (error: any) {

        toast.error(
            error.response?.data?.detail ??
            `Failed to provision ${provider}.`
        );

    }

}

    async function handleRevoke(provider: string) {

    if (!id) return;

    try {

        const response = await revokeEmployeeAccess(
            id,
            provider,
        );

        toast.success(response.message);

        await loadEmployee();

        } catch (error: any) {

        toast.error(
            error.response?.data?.detail ??
            `Failed to revoke ${provider}.`
        );

    }

    }

    const [employee, setEmployee] = useState<Employee | null>(null);

    const [accessRecords, setAccessRecords] = useState<AccessRecord[]>([]);
    
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

    async function loadEmployee() {

        if (!id) return;

        const employeeData = await getEmployee(id);

        const accessData = await getEmployeeAccess(id);

        const auditData = await getEmployeeAudit(id);

        setEmployee(employeeData);

        setAccessRecords(accessData);

        setAuditLogs(auditData);

}

    useEffect(() => {

        loadEmployee();

    }, [id]);

    if (!employee) {

        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-slate-400">
                    Loading employee...
                </p>
            </div>
);

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

<div className="space-y-3">

    <div>
        <h1 className="text-4xl font-bold">
            {employee.first_name} {employee.last_name}
        </h1>

        <p className="text-slate-400">
            {employee.designation}
        </p>
    </div>

        <div className="space-y-1 text-sm text-slate-400">

            <p>
                <span className="font-medium text-slate-300">
                    Email:
                </span>{" "}
                {employee.email}
            </p>

            <p>
                <span className="font-medium text-slate-300">
                    GitHub:
                </span>{" "}
                {employee.github_username || "Not configured"}
            </p>

            <p>
                <span className="font-medium text-slate-300">
                    Department:
                </span>{" "}
                {employee.department}
            </p>

        </div>

        <Badge
            className={
                employee.employment_status === "ACTIVE"
                    ? "bg-green-600"
                    : "bg-red-600"
            }
        >
            {employee.employment_status}
        </Badge>

    </div>

            </div>
                    <AccessRecordCard
            records={accessRecords}
                onProvision={handleProvision}
                onRevoke={handleRevoke}
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