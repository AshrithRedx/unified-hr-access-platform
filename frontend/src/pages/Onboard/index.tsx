import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Building2,
    Briefcase,
    Mail,
    User,
    UserPlus,
} from "lucide-react";

import { toast } from "sonner";

import { onboardEmployee } from "@/api/employeeApi";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Onboard() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        department: "",
        designation: "",
    });

    function updateField(
        key: keyof typeof form,
        value: string,
    ) {
        setForm({
            ...form,
            [key]: value,
        });
    }

    async function handleSubmit(
        e: React.FormEvent,
    ) {

        e.preventDefault();

        setLoading(true);

        try {

            await onboardEmployee(form);

            toast.success(
                "Employee onboarded successfully!",
            );

            navigate("/employees");

        } catch {

            toast.error(
                "Failed to onboard employee.",
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="mx-auto max-w-4xl space-y-8">

            <div>

                <h1 className="text-4xl font-bold tracking-tight">

                    Onboard Employee

                </h1>

                <p className="mt-2 text-slate-400">

                    Create a new employee and provision
                    enterprise identity access.

                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <Card className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <div className="mb-6 flex items-center gap-3">

                        <User className="text-blue-400" />

                        <h2 className="text-xl font-semibold">

                            Personal Information

                        </h2>

                    </div>

                    <div className="grid gap-5 md:grid-cols-2">

                        <Input
                            placeholder="First Name"
                            value={form.first_name}
                            onChange={(e) =>
                                updateField(
                                    "first_name",
                                    e.target.value,
                                )
                            }
                        />

                        <Input
                            placeholder="Last Name"
                            value={form.last_name}
                            onChange={(e) =>
                                updateField(
                                    "last_name",
                                    e.target.value,
                                )
                            }
                        />

                    </div>

                    <div className="mt-5">

                        <Input
                            placeholder="Email Address"
                            value={form.email}
                            onChange={(e) =>
                                updateField(
                                    "email",
                                    e.target.value,
                                )
                            }
                        />

                    </div>

                </Card>

                <Card className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <div className="mb-6 flex items-center gap-3">

                        <Building2 className="text-blue-400" />

                        <h2 className="text-xl font-semibold">

                            Organization

                        </h2>

                    </div>

                    <div className="grid gap-5 md:grid-cols-2">

                        <Input
                            placeholder="Department"
                            value={form.department}
                            onChange={(e) =>
                                updateField(
                                    "department",
                                    e.target.value,
                                )
                            }
                        />

                        <Input
                            placeholder="Designation"
                            value={form.designation}
                            onChange={(e) =>
                                updateField(
                                    "designation",
                                    e.target.value,
                                )
                            }
                        />

                    </div>

                </Card>

                <Card className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <div className="mb-6 flex items-center gap-3">

                        <Briefcase className="text-blue-400" />

                        <h2 className="text-xl font-semibold">

                            Enterprise Access

                        </h2>

                    </div>

                    <div className="grid gap-4 md:grid-cols-3">

                        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-center">
                            GitHub
                        </div>

                        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-center">
                            Slack
                        </div>

                        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-center">
                            Google Workspace
                        </div>

                    </div>

                </Card>

                <div className="flex justify-end">

                    <Button
                        type="submit"
                        disabled={loading}
                        className="min-w-[220px]"
                    >

                        <UserPlus className="mr-2 h-4 w-4" />

                        {loading
                            ? "Creating Employee..."
                            : "Onboard Employee"}

                    </Button>

                </div>

            </form>

        </div>

    );

}