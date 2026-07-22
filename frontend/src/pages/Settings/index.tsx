import {
    CheckCircle2,
    GitBranch,
    Settings as SettingsIcon,
    Server,
    Database,
    Code2,
    Globe,
    AlertCircle,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Settings() {

    return (

        <div className="mx-auto max-w-5xl space-y-8">

            <div>

                <h1 className="flex items-center gap-3 text-4xl font-bold">

                    <SettingsIcon />

                    Settings

                </h1>

                <p className="mt-2 text-slate-400">

                    Application configuration and provider integrations.

                </p>

            </div>

            <Card className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <h2 className="mb-6 text-2xl font-semibold">

                    Application

                </h2>

                <div className="grid gap-6 md:grid-cols-3">

                    <div>

                        <p className="text-sm text-slate-500">
                            Platform
                        </p>

                        <p className="font-medium">
                            Unified HR Access Platform
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Version
                        </p>

                        <p className="font-medium">
                            v1.0
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Environment
                        </p>

                        <Badge className="bg-green-600">
                            Production Ready
                        </Badge>

                    </div>

                </div>

            </Card>

            <Card className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <h2 className="mb-8 text-2xl font-semibold">

                    Provider Integrations

                </h2>

                <div className="space-y-8">

                    <div className="flex items-start justify-between">

                        <div className="flex gap-4">

                            <GitBranch className="mt-1 text-white" />

                            <div>

                                <h3 className="font-semibold">

                                    GitHub

                                </h3>

                                <p className="text-sm text-slate-400">

                                    Repository

                                </p>

                                <p>

                                    AshrithRedx/unified-hr-access-platform

                                </p>

                                <p className="mt-2 text-sm text-slate-400">

                                    Authentication

                                </p>

                                <p>

                                    Personal Access Token

                                </p>

                            </div>

                        </div>

                        <Badge className="bg-green-600">

                            <CheckCircle2 className="mr-1 h-4 w-4" />

                            Live Integration

                        </Badge>

                    </div>

                    <hr className="border-slate-800" />

                    <div className="flex items-start justify-between">

                        <div>

                            <h3 className="font-semibold">

                                Slack

                            </h3>

                            <p className="text-slate-400">

                                Adapter implementation available.

                            </p>

                        </div>

                        <Badge
                            variant="secondary"
                        >
                            Mock Provider
                        </Badge>

                    </div>

                    <hr className="border-slate-800" />

                    <div className="flex items-start justify-between">

                        <div>

                            <h3 className="font-semibold">

                                Google Workspace

                            </h3>

                            <p className="text-slate-400">

                                Adapter implementation available.

                            </p>

                        </div>

                        <Badge
                            variant="secondary"
                        >
                            Mock Provider
                        </Badge>

                    </div>

                </div>

            </Card>

            <Card className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <h2 className="mb-6 text-2xl font-semibold">

                    Technology Stack

                </h2>

                <div className="grid gap-6 md:grid-cols-3">

                    <div className="flex items-center gap-3">

                        <Code2 />

                        <div>

                            <p className="font-medium">

                                Frontend

                            </p>

                            <p className="text-sm text-slate-400">

                                React + TypeScript

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Server />

                        <div>

                            <p className="font-medium">

                                Backend

                            </p>

                            <p className="text-sm text-slate-400">

                                FastAPI

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Database />

                        <div>

                            <p className="font-medium">

                                Database

                            </p>

                            <p className="text-sm text-slate-400">

                                PostgreSQL

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Globe />

                        <div>

                            <p className="font-medium">

                                External API

                            </p>

                            <p className="text-sm text-slate-400">

                                GitHub REST API

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <AlertCircle />

                        <div>

                            <p className="font-medium">

                                Architecture

                            </p>

                            <p className="text-sm text-slate-400">

                                Repository • Service • Adapter

                            </p>

                        </div>

                    </div>

                </div>

            </Card>

        </div>

    );

}