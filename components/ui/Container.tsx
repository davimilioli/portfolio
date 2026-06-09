import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    clean?: boolean;
}

export default function Container({ children, className = "", clean = false }: ContainerProps) {
    return (
        <div className={`max-w-7xl mx-auto ${clean ? "" : "px-4 md:px-12 lg:px-24"} ${className}`}>
            {children}
        </div>
    );
}