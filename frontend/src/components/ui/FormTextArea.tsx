import { FC, TextareaHTMLAttributes } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

type FormInputProps = {
  id: string;
  name?: string;
  label: string;
  error?: FieldError;
  required?: boolean;
  register?: UseFormRegister<any>;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormTextArea: FC<FormInputProps> = ({
  label,
  id,
  register,
  required,
  name,
  error,
  ...otherProps
}) => {
  return (
    <div className="relative my-6">
      <textarea
        id={id}
        className="peer w-full border-b-2 border-gray-300 text-gray-900 resize-none placeholder-transparent focus:outline-none focus:border-amber-500"
        {...register?.(id, { required })}
        {...otherProps}
      />

      {label && (
        <label
          htmlFor={id}
          className="absolute pointer-events-none left-0 -top-4 text-gray-700 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-gray-700 peer-focus:text-xs"
        >
          {label}
        </label>
      )}

      {error?.message && (
        <div className="text-red-600 text-xs mt-1">{error?.message}</div>
      )}
    </div>
  );
};
