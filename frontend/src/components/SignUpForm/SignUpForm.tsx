import { useContext } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FormInput } from '../ui/FormInput';
import { RegistrationValidator } from '../../utils/validators/registration.validator';
import { AuthModalContext } from '../../store/context/AuthModalContext';

type Inputs = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
};

export const SignUpForm = () => {
  const { handleLogInModalSwitch } = useContext(AuthModalContext);

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
        id="username"
        type="text"
        label="Username"
        placeholder="Username"
        register={register}
        error={errors.username}
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
      <FormInput
        id="repeatPassword"
        type="password"
        label="Repeat password"
        placeholder="Repeat password"
        register={register}
        error={errors.repeatPassword}
        required
      />

      <p className="pb-5">
        Already registered?{' '}
        <span
          className="text-blue-500 hover:cursor-pointer hover:text-red-500"
          onClick={handleLogInModalSwitch}
        >
          Log In
        </span>
      </p>

      <div className="flex justify-center">
        <button className="primary-button w-[30%]" disabled={!isValid}>
          Register
        </button>
      </div>
    </form>
  );
};
