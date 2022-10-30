import { useContext } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FormInput } from '../ui/FormInput';
import { AuthModalContext } from '../../store/context/AuthModalContext';
import { RegistrationValidator } from '../../utils/validators/registration.validator';

type Inputs = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
};

export const LogInForm = () => {
  const { handleSignUpModalSwitch } = useContext(AuthModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onBlur',
    resolver: joiResolver(RegistrationValidator),
  });

  const submitHandler: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
    if (!isValid) return;
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormInput
        id="email"
        type="email"
        label="E-mail"
        placeholder="E-mail"
        register={register}
        error={errors.email}
        required
      />
      <FormInput
        id="password"
        type="password"
        label="Password"
        placeholder="Password"
        register={register}
        error={errors.password}
        required
      />

      <p className="pb-5">
        Don't have an account?{' '}
        <span
          className="text-blue-500 hover:cursor-pointer hover:text-red-500"
          onClick={handleSignUpModalSwitch}
        >
          Create account
        </span>
      </p>

      <div className="flex justify-center">
        <button className="primary-button w-[30%]" disabled={!isValid}>
          Log In
        </button>
      </div>
    </form>
  );
};
