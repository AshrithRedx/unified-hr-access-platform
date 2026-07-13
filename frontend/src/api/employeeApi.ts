import api from "./axios";

export async function getEmployees() {
    const response = await api.get("/employees");
    return response.data;
}

export async function getEmployee(id: string) {

    const response = await api.get(`/employees/${id}`);

    return response.data;

}

export async function getEmployeeAccess(id: string) {

    const response = await api.get(
        `/employees/${id}/access`
    );

    return response.data;

}

export async function getEmployeeAudit(id: string) {

    const response = await api.get(
        `/employees/${id}/audit`
    );

    return response.data;

}

export async function offboardEmployee(id: string) {

    const response = await api.post(
        `/employees/${id}/offboard`
    );

    return response.data;

}

export async function onboardEmployee(data: {
    first_name: string;
    last_name: string;
    email: string;
    department: string;
    designation: string;
}) {

    const response = await api.post(
        "/employees/onboard",
        data,
    );

    return response.data;

}

import type { DashboardSummary } from "@/types/dashboard";

export async function getDashboardSummary():
Promise<DashboardSummary> {

    const response = await api.get(
        "/dashboard/summary",
    );

    return response.data;

}

import type { GlobalAuditLog } from "@/types/audit";

export async function getAuditLogs():
Promise<GlobalAuditLog[]> {

    const response =
        await api.get("/audit");

    return response.data;

}