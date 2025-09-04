import { type MouseEvent as ReactMouseEvent } from "react";
import { Button as ShadCnButton } from "./ui/button.tsx";
import { cn } from "./ui/lib/utils.ts";
import clsx from "clsx";

type ButtonProps = {
    text: string;
    onClick?: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string
    hasError?: boolean
    type: "button" | "submit" | "reset" | undefined
    textStyle?: string
};

function Button({ text, onClick, className, hasError = false, type, textStyle  }: ButtonProps) {
    return (
        <ShadCnButton type={type} onClick={onClick} className={clsx(cn("hover:cursor-pointer", className) ,hasError && "bg-red-700 hover:bg-red-700 animate-shake")}>
            <span className={cn("text-xl", textStyle)}>{text}</span>
        </ShadCnButton>
    );
}

export default Button;
