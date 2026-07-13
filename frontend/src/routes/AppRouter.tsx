import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Audit from "@/pages/Audit";

import AppShell from "@/components/layout/AppShell";

import Dashboard from "@/pages/Dashboard";
import Employees from "@/pages/Employees";
import EmployeeProfile from "@/pages/EmployeeProfile";
import Onboard from "@/pages/Onboard";
import Settings from "@/pages/Settings";

export default function AppRouter() {
    return (
        <BrowserRouter>

            <AppShell>

                <Routes>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/employees"
                        element={<Employees />}
                    />

                    <Route
                        path="/employees/:id"
                        element={<EmployeeProfile />}
                    />
                    <Route
                        path="/audit"
                        element={<Audit />}
                    />
                    <Route
                        path="/onboard"
                        element={<Onboard />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                </Routes>

            </AppShell>

        </BrowserRouter>
    );
}