import { useLocation } from "react-router-dom";

export default function Container({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    return (
        <div
            className={`w-full min-h-[calc(100vh-4rem)] bg-neutral-50 ${
                !location.pathname.startsWith("/dashboard")
                    ? ""
                    : "p-4 md:p-0 md:pl-16"
            }`}
        >
            {children}
        </div>
    );
}
