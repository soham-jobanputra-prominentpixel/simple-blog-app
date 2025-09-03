import { useField } from "formik";
import { Input } from "../../ui/input.tsx";

type InputFieldProps = {
    label: string;
    name: string;
    placeholder: string;
    type: string;
    className?: string
    accept?: string
};

function InputField({ label, ...props }: InputFieldProps) {
    const [field, meta] = useField(props);

    return (
        <div className={props.className}>
            <label htmlFor={props.name} className="font-bold text-xl">{label}:</label>
            <Input {...field} {...props} id={props.name} className="border-2 border-black bg-white" accept={props.accept} />
            {meta.touched && meta.error
                ? <div className="error text-red-700 mb-2">{meta.error}</div>
                : null}
        </div>
    );
}

export default InputField;
