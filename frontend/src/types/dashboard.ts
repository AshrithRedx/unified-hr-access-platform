export interface DashboardActivity {

    action: string;

    provider: string | null;

    message: string;

    occurred_at: string;

}

export interface DashboardSummary {

    total_employees: number;

    active_employees: number;

    offboarded_employees: number;

    provisioned_accounts: number;

    recent_activity: DashboardActivity[];

}