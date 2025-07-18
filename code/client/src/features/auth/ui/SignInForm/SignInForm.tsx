import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import type { UserSignInDataType } from "@/entities/user/model";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { UserValidator } from "@/entities/user/validation/User.validator";
import { signInThunk } from "@/entities/user/api/UserApi";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import "./SignInForm.css";

const INITIAL_INPUTS_DATA = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<UserSignInDataType>(INITIAL_INPUTS_DATA);
  const dispatch = useAppDispatch();
  const { isLoading: userLoading, error: userError } = useAppSelector(
    (state) => state.user
  );

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignInData(inputs);

    if (!isValid) {
      console.log(validationError, "Ошибка валидации");
      return;
    }

    try {
      await dispatch(signInThunk(inputs)).unwrap();
      setInputs(INITIAL_INPUTS_DATA);
      navigate(CLIENT_ROUTES.HOME);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error instanceof AxiosError)
          console.log("Какая то рандомная ошибка в форме входа");
      }
    }
  };

  useEffect(() => {
    if (userError) console.log("какя то ошибка в форме входа в юзэффекте");
  }, [userError]);

  return (
    <div className="sign">
      <form className="signin-form" onSubmit={onSubmitHandler}>
        <h2>Вход</h2>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email пользователя"
            value={inputs.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль пользователя"
            value={inputs.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <button type="submit" disabled={userLoading}>
          {userLoading ? "Загрузка..." : "Войти"}
        </button>
      </form>
    </div>
  );
}
