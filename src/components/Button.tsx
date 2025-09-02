import { type MouseEvent as ReactMouseEvent } from "react";
import { Button as ShadCnButton } from "./ui/button.tsx";
import { cn } from "./ui/lib/utils.ts";
import clsx from "clsx";

type ButtonProps = {
    text: string;
    onClick?: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string
    hasError?: boolean
};

function Button({ text, onClick, className, hasError = false }: ButtonProps) {
    return (
        <ShadCnButton onClick={onClick} className={clsx("hover:cursor-pointer" ,hasError && "bg-red-700 hover:bg-red-700 animate-shake")}>
            <span className={cn("text-xl", className)}>{text}</span>
        </ShadCnButton>
    );
}

export default Button;
