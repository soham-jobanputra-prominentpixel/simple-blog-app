import { useField } from "formik";
import Editor from "react-simple-wysiwyg";

type EditorFieldProps = {
  name: string;
  placeholder: string;
  className?: string;
};

function EditorField({ ...props }: EditorFieldProps) {
  const [field, meta] = useField(props);

  return (
    <div className={props.className}>
      {/* @ts-expect-error Editor is valid JSX element at runtime */}
      <Editor {...field} {...props} id={props.name} />
      {meta.touched && meta.error
        ? <div className="error text-red-700">{meta.error}</div>
        : null}
    </div>
  );
}

export default EditorField;
