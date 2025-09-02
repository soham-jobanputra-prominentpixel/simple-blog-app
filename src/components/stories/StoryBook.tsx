import type { JSX } from "react";

type StoryBookProps = {
    children: JSX.Element[] | JSX.Element;
};

function StoryBook({ children }: StoryBookProps) {
    return (
        <div className="w-fit px-8 py-4 mx-auto my-4 border-2 border-black">
            <div className="flex flex-col gap-5">
                {children}
            </div>
        </div>
    );
}

export default StoryBook;


type StoryProps = {
    title: string
    children: JSX.Element
}

export function Story({ title, children }: StoryProps) {
    return ( 
        <div className="flex items-start flex-col gap-1">
            <span className="text-2xl">{title}</span> <br />
            {children}
        </div>
     );
}
