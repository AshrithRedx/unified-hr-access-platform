export interface AuditLog {

    id: string;

    action: string;

    provider: string | null;

    message: string;

    occurred_at: string;

}