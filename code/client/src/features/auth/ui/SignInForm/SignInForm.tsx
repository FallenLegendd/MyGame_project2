/* import React, { useEffect, useId, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserValidator } from '@/entities/user/validation/User.validator';
import { signInThunk } from '@/entities/user/api/UserApi';
import type { UserSignInDataType } from '@/entities/user/model';
import { AxiosError } from 'axios';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useAlerts } from '@/features/alert';

const INITIAL_INPUTS_DATA = {
  email: '',
  password: '',
};

export default function SignInForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<UserSignInDataType>(INITIAL_INPUTS_DATA);
  const dispatch = useAppDispatch();
  const { dispatch: alertDispatch } = useAlerts();
  const { isLoading: userLoading, error: userError } = useAppSelector(
    (state) => state.user
  );

  const emailId = useId();
  const passwordId = useId();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignInData(inputs);

    if (!isValid) {
      alertDispatch({
        type: 'SHOW_WARNING',
        payload: { message: validationError ?? '' },
      });
      return;
    }

    try {
      const result = await dispatch(signInThunk(inputs)).unwrap();
      alertDispatch({
        type: 'SHOW_SUCCESS',
        payload: {
          message: 'С возвращением, ' + result.username,
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

  console.log(passwordId);

  return (
    <form onSubmit={onSubmitHandler}>
      <label style={{ color: 'black' }} htmlFor={emailId}>
        Email
      </label>
      <input
        id={emailId}
        placeholder='email'
        type='email'
        name='email'
        required
        value={inputs.email}
        onChange={onChangeHandler}
      />
      <label style={{ color: 'black' }} htmlFor={passwordId}>
        password
      </label>
      <input
        id={passwordId}
        placeholder='password'
        type='password'
        name='password'
        required
        value={inputs.password}
        onChange={onChangeHandler}
      />
      <button type='submit' disabled={userLoading}>
        {userLoading ? 'Загрузка...' : 'Войти'}
      </button>
    </form>
  );
}
 */