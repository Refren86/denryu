import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Loader } from '../ui/Loader';
import { FormInput } from '../ui/FormInput';
import { AuthModalContext } from '../../store/context/AuthModalContext';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { LoginValidator } from '../../utils/validators/login.validator';
import { login } from '../../store/redux/slices/auth.slice';
import { Button } from '../ui/Button';


type Inputs = {
  email: string;
  password: string;
};

export const LogInForm = () => {
  const dispatch = useAppDispatch();
  const { status: loginStatus } = useAppSelector(({ auth }) => auth);

  const { handleSignUpModalSwitch } = useContext(AuthModalContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
    resolver: joiResolver(LoginValidator),
  });

  const submitHandler: SubmitHandler<Inputs> = async (data: Inputs) => {
    if (!isValid) return;
    const { payload } = await dispatch(login(data));

    if ('user' in payload!) {
      navigate(`/profile/${payload?.user?.username}`);
    }
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
        <Button disabled={!isValid}>
          {loginStatus === 'loading' ? <Loader /> : "Log In"}
        </Button>
      </div>
    </form>
  );
};
