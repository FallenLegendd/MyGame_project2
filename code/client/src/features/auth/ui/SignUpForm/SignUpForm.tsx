import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import type { UserSignUpDataType } from "@/entities/user/model";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { UserValidator } from "@/entities/user/validation/User.validator";
import { signUpThunk } from "@/entities/user/api/UserApi";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";

const INITIAL_INPUTS_DATA = {
  username: "",
  email: "",
  password: "",
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<UserSignUpDataType>(INITIAL_INPUTS_DATA);
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
      UserValidator.validateSignUpData(inputs);

    if (!isValid) {
      console.log(validationError, "Ошибка валидации");
      return;
    }

    try {
      await dispatch(signUpThunk(inputs)).unwrap();
      setInputs(INITIAL_INPUTS_DATA);
      navigate(CLIENT_ROUTES.HOME);
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        console.log("Какая то рандомная ошибка в форме регистрации");
    }
  };

  useEffect(() => {
    if (userError)
      console.log("какя то ошибка в форме регистрации в юзэффекте");
  }, [userError]);

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={onSubmitHandler}>
        <h2>Регистрация</h2>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            autoFocus
            onChange={onChangeHandler}
            value={inputs.username}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeHandler}
            value={inputs.email}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={onChangeHandler}
            value={inputs.password}
            className="form-input"
          />
        </div>
        <button type="submit" disabled={userLoading} className="submit-btn">
          {userLoading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
