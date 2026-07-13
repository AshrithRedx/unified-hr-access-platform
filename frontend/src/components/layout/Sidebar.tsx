import {
    LayoutDashboard,
    Users,
    UserPlus,
    History,
    Settings,
    ShieldCheck,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
    },
    {
        name: "Employees",
        icon: Users,
        path: "/employees",
    },
    {
        name: "Onboard",
        icon: UserPlus,
        path: "/onboard",
    },
    {
        name: "Audit",
        icon: History,
        path: "/audit",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings",
    },
];

export default function Sidebar() {
    return (
        <aside className="
w-72
border-r
border-slate-800
bg-[#08111f]
flex
flex-col
">

            <div>

                <div className="px-6 py-8">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-blue-600 p-3">

                            <ShieldCheck size={22} />

                        </div>

                        <div>

                            <h1 className="font-bold text-lg">
                                Unified HR
                            </h1>

                            <p className="text-xs text-slate-400">
                                Enterprise IAM
                            </p>

                        </div>

                    </div>

                </div>

                <nav className="mt-8 space-y-2 px-3">

                    {menu.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    transition-all

                                    ${
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-300 hover:bg-slate-800"
                                    }
                                `
                                }
                            >

                                <Icon size={20} />

                                {item.name}

                            </NavLink>

                        );

                    })}

                </nav>

            </div>

            <div className="p-6">

                <div className="rounded-xl bg-slate-800 p-4">

                    <div className="flex items-center gap-3">

                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

                        <div>

                            <p className="text-sm font-medium">
                                Backend Connected
                            </p>

                            <p className="text-xs text-slate-400">
                                Local Development
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </aside>
    );
}