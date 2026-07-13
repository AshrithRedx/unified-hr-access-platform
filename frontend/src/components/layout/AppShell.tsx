import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type Props = {
    children: ReactNode;
};

export default function AppShell({
    children,
}: Props) {
    return (
        <div className="flex h-screen bg-[#0B1220] text-white">

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Topbar />

                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}