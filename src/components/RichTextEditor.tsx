import Editor, { type ContentEditableEvent } from "react-simple-wysiwyg";
import { useState } from "react";

type RichTextEditorProps = {
    onChange: (html: string) => void;
};

function RichTextEditor({ onChange }: RichTextEditorProps) {
    const [html, setHtml] = useState("");


    function handleChange(e: ContentEditableEvent) {
        setHtml(e.target.value)
        onChange(e.target.value);
    }

    // @ts-expect-error Editor is valid JSX element at runtime
    return <Editor value={html} onChange={handleChange} />;
}

export default RichTextEditor;
