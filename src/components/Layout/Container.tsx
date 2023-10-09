export default function Container({ children }: { children: React.ReactNode }) {
    return <div className="w-full min-h-[calc(100vh-4rem)] p-4 md:p-0 md:pl-16">{children}</div>;
}
