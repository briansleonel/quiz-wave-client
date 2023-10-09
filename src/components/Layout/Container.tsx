export default function Container({ children }: { children: React.ReactNode }) {
    return <div className="w-full min-h-[calc(100vh-4rem)]">{children}</div>;
}
