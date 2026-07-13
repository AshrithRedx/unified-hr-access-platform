import { Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function Topbar() {
    return (
        <header className="
sticky
top-0
z-30
h-20
border-b
border-slate-800
bg-[#0B1220]/80
backdrop-blur-xl
flex
items-center
justify-between
px-8
">

            <div className="relative w-[420px]">

                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <Input
                    placeholder="Search employees..."
                    className="pl-10 rounded-xl bg-slate-900 border-slate-700"
                />

            </div>

            <div className="flex items-center gap-5">

                <div className="rounded-lg border border-slate-700 px-3 py-1 text-sm text-slate-400">
                    Ctrl + K
                </div>

                <button className="rounded-xl p-2 hover:bg-slate-800 transition">
                    <Bell size={20} />
                </button>

                <Avatar>
                    <AvatarFallback>AR</AvatarFallback>
                </Avatar>

            </div>

        </header>
    );
}