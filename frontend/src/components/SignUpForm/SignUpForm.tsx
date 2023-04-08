import { useContext } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FormInput } from '../ui/FormInput';
import { RegistrationValidator } from '../../utils/validators/registration.validator';
import { AuthModalContext } from '../../store/context/AuthModalContext';
import { useAppDispatch } from '../../hooks/redux';
import { signUp } from '../../store/redux/slices/auth.slice';
import { Button } from '../ui/Button';

type Inputs = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
};

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const { handleLogInModalSwitch } = useContext(AuthModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
    resolver: joiResolver(RegistrationValidator),
  });

  const submitHandler: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
    if (!isValid) return;

    const { repeatPassword, ...registrationData } = data;

    dispatch(signUp(registrationData));
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
        <Button disabled={!isValid}>
          Register
        </Button>
      </div>
    </form>
  );
};
