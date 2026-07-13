import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Card } from "@/components/ui/card";

// import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import type { Employee } from "@/types/employee";

import EmploymentStatusBadge from "@/components/common/EmploymentStatusBadge";

type Props = {
    employees: Employee[];
};

export default function EmployeeTable({
    employees,
}: Props) {
    const navigate = useNavigate();

    return (
    <Card className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden">
        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead className="text-slate-300 font-semibold">Employee</TableHead>

                    <TableHead className="text-slate-300 font-semibold">Email</TableHead>

                    <TableHead className="text-slate-300 font-semibold">Department</TableHead>

                    <TableHead className="text-slate-300 font-semibold">Status</TableHead>


                    <TableHead className="text-right">
                        Actions
                    </TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {employees.map((employee) => (

                    <TableRow
                        key={employee.id}
                        className="hover:bg-slate-800/60 transition-colors"
                    >

                        <TableCell>

                            <div className="flex items-center gap-3">

                                <Avatar>

                                    <AvatarFallback className="bg-blue-600 text-white font-semibold">

                                        {employee.first_name.charAt(0)}
                                        {employee.last_name.charAt(0)}

                                    </AvatarFallback>

                                </Avatar>

                                <div>

                                    <p className="font-medium">

                                        {employee.first_name} {employee.last_name}

                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">

                                        {employee.designation}

                                    </p>

                                </div>

                            </div>

                        </TableCell>

                        <TableCell>

                            {employee.email}

                        </TableCell>

                        <TableCell>

                            {employee.department}

                        </TableCell>

                        <TableCell>

                            <EmploymentStatusBadge
                                status={employee.employment_status}
                            />

                        </TableCell>

                        <TableCell className="text-right">

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => navigate(`/employees/${employee.id}`)}
                        >
                            <Eye className="mr-2 h-4 w-4" />

                            View
                        </Button>

                    </TableCell>

                    </TableRow>

                ))}

            </TableBody>

        </Table>
    </Card>

    );

}