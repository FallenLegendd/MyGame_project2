import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/reduxHooks";
import { signOutThunk } from "@/entities/user/api/UserApi";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import "./Header.css";

export default function Header() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await dispatch(signOutThunk()).unwrap();
      navigate(CLIENT_ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav">
          <NavLink
            to={CLIENT_ROUTES.HOME}
            className={({ isActive }) =>
              `nav__link ${isActive ? "nav__link_active" : ""}`
            }
          >
            Главная
          </NavLink>
        </nav>

        <div className="auth-section">
          {user?.username ? (
            <>
              <NavLink
                to={CLIENT_ROUTES.QUIZ}
                className={({ isActive }) =>
                  `nav__link ${isActive ? "nav__link_active" : ""}`
                }
              >
                Играть
              </NavLink>

              <NavLink
                to={CLIENT_ROUTES.QUIZ_RESULT}
                className={({ isActive }) =>
                  `nav__link ${isActive ? "nav__link_active" : ""}`
                }
              >
                Результаты
              </NavLink>
              <span className="nav__link">Привет, {user.username}!</span>
              <NavLink
                onClick={logoutHandler}
                to={CLIENT_ROUTES.LOGOUT}
                className={({ isActive }) =>
                  `auth-link ${isActive ? "auth-link_active" : ""}`
                }
              >
                Выход
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={CLIENT_ROUTES.LOGIN}
                className={({ isActive }) =>
                  `auth-link ${isActive ? "auth-link_active" : ""}`
                }
              >
                Войти
              </NavLink>
              <NavLink
                to={CLIENT_ROUTES.REGISTER}
                className={({ isActive }) =>
                  `auth-link ${isActive ? "auth-link_active" : ""}`
                }
              >
                Зарегистрироваться
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
