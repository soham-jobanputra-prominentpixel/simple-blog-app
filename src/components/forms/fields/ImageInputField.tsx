import { useState } from "react";
import { useField } from "formik";

type ImageInputFieldProps = {
  label: string;
  name: string;
  className?: string;
  disabled?: boolean;
};

function ImageInputField({ label, ...props }: ImageInputFieldProps) {
  const [field, meta, helpers] = useField(props.name);
  const [preview, setPreview] = useState<string | null>(field.value || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Url = reader.result as string;
      helpers.setValue(base64Url); // update Formik state
      setPreview(base64Url); // update local preview
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={props.className}>
      <label htmlFor={props.name} className="font-bold text-xl block mb-2">
        {label}:
      </label>

      {/* Image Preview */}
      {preview && (
        <div className="mb-2">
          <img
            src={preview}
            alt="Preview"
            className="max-w-[200px] rounded border"
          />
        </div>
      )}

      <input
        id={props.name}
        name={props.name}
        type="file"
        accept="image/*"
        disabled={props.disabled ?? false}
        onChange={handleFileChange}
        className="border-2 border-black bg-white p-1"
      />

      {meta.touched && meta.error
        ? <div className="error text-red-700 mb-2">{meta.error}</div>
        : null}
    </div>
  );
}

export default ImageInputField;
