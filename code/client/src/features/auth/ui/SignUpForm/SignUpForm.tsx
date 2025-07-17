/* import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { UserSignUpDataType } from '@/entities/user/model';
import { UserValidator } from '@/entities/user/validation/User.validator';
import { signUpThunk } from '@/entities/user/api/UserApi';
import { AxiosError } from 'axios';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useAlerts } from '@/features/alert';

const INITIAL_INPUTS_DATA = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<UserSignUpDataType>(INITIAL_INPUTS_DATA);
  const dispatch = useAppDispatch();
  const { dispatch: alertDispatch } = useAlerts();
  const { isLoading: userLoading, error: userError } = useAppSelector(
    (state) => state.user
  );

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignUpData(inputs);

    if (!isValid) {
      alertDispatch({
        type: 'SHOW_WARNING',
        payload: { message: validationError ?? '' },
      });
      return;
    }

    if (inputs.password !== inputs.repeatPassword) {
      alertDispatch({
        type: 'SHOW_WARNING',
        payload: { message: 'Пароли не совпадают' },
      });
      return;
    }

    try {
      const result = await dispatch(signUpThunk(inputs)).unwrap();
      alertDispatch({
        type: 'SHOW_SUCCESS',
        payload: {
          message: 'Добро пожаловать в систему, ' + result.username,
        },
      });
      setInputs(INITIAL_INPUTS_DATA);
      navigate(CLIENT_ROUTES.TASKS);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alertDispatch({
          type: 'SHOW_ERROR',
          payload: {
            message: error.message,
          },
        });
      }
    }
  };

  useEffect(() => {
    if (userError) {
      alertDispatch({
        type: 'SHOW_ERROR',
        payload: { message: userError },
      });
    }
  }, [userError]);

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        placeholder='username'
        name='username'
        required
        value={inputs.username}
        onChange={onChangeHandler}
      />
      <input
        placeholder='email'
        type='email'
        name='email'
        required
        value={inputs.email}
        onChange={onChangeHandler}
      />
      <input
        placeholder='password'
        type='password'
        name='password'
        required
        value={inputs.password}
        onChange={onChangeHandler}
      />
      <input
        placeholder='password'
        type='password'
        name='repeatPassword'
        required
        value={inputs.repeatPassword}
        onChange={onChangeHandler}
      />
      <button type='submit' disabled={userLoading}>
        {userLoading ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}
 */