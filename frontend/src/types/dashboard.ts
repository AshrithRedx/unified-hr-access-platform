export interface DashboardActivity {

    action: string;

    provider: string | null;

    message: string;

    occurred_at: string;

}

export interface SecurityAlert {

    employee_id: string;

    employee_name: string;

    provider: string;

    status: string;

}

export interface DashboardSummary {

     total_employees: number;

    active_employees: number;

    offboarded_employees: number;

    provisioned_accounts: number;

    recent_activity: DashboardActivity[];

    security_alerts: SecurityAlert[];

}