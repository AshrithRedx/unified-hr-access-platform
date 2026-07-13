import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import EmployeeTable from "@/components/employee/EmployeeTable";

import { getEmployees } from "@/api/employeeApi";

import type { Employee } from "@/types/employee";

import { Button } from "@/components/ui/button";

export default function Employees() {

    const [employees, setEmployees] = useState<Employee[]>([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        async function loadEmployees() {

            try {

                const data = await getEmployees();

                setEmployees(data);

            } finally {

                setLoading(false);

            }

        }

        loadEmployees();

    }, []);

    const filteredEmployees = employees.filter((employee) => {

    const query = search.toLowerCase();

    return (
        employee.first_name.toLowerCase().includes(query) ||
        employee.last_name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query)
    );

});

    if (loading) {

        return <p>Loading employees...</p>;

    }

    return (

        <div className="space-y-8">

           <div className="flex items-center justify-between">

    <div>

        <h1 className="text-4xl font-bold tracking-tight">

            Employees

        </h1>

        <p className="mt-2 text-slate-400">

            Manage employee identities and access.

        </p>

    </div>

    <Button>

        + Onboard Employee

    </Button>

</div>

    <Input
        placeholder="Search employees by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
    />

    <EmployeeTable employees={filteredEmployees} />

    </div>

    );

}