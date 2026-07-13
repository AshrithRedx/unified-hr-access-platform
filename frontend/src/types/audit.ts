export interface GlobalAuditLog {

    id: string;

    employee_name: string;

    action: string;

    provider: string | null;

    message: string;

    occurred_at: string;

}