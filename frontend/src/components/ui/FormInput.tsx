import { FC, InputHTMLAttributes, useState } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

import EyeOpen from '../../assets/svgs/eye-open.svg';
import EyeClose from '../../assets/svgs/eye-close.svg';

type FormInputProps = {
  id: string;
  name?: string;
  label: string;
  error?: FieldError;
  required?: boolean;
  register?: UseFormRegister<any>;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput: FC<FormInputProps> = ({
  label,
  id,
  register,
  type='text',
  required,
  name,
  error,
  ...otherProps
}) => {
  const [isPassShown, setPassShown] = useState(false);
  const [typeState, setTypeState] = useState(type);

  const eyeClickHandler = () => {
    setPassShown(!isPassShown);
    setTypeState(typeState === 'password' ? 'text' : 'password')
  }

  return (
    <div className="relative my-6">
      <input
        id={id}
        type={typeState}
        className="peer px-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-amber-500"
        {...register?.(id, { required })}
        {...otherProps}
      />

      {label && (
        <label
          htmlFor={id}
          className="absolute pointer-events-none left-2 -top-3.5 text-gray-700 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-700 peer-focus:text-xs"
        >
          {label}
        </label>
      )}

      {type === 'password' && (
        <img
          src={isPassShown ? EyeOpen : EyeClose}
          onClick={eyeClickHandler}
          className="absolute top-1.5 right-2 cursor-pointer"
          alt="Eye icon"
        />
      )}

      {error?.message && (
        <div className="text-red-600 text-xs mt-1">{error?.message}</div>
      )}
    </div>
  );
};

