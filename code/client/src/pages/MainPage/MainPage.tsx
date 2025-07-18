import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useNavigate } from "react-router";
import "./MainPage.css";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

export default function MainPage() {
  const user = useAppSelector((state) => state.user);
  const isAuthenticated = !!user?.user;
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate(isAuthenticated ? CLIENT_ROUTES.GAME : CLIENT_ROUTES.LOGIN);
  };

  return (
    <div className="main-page-container">
      <div className="main-content">
        <h1 className="main-title">ДИСКО-ИГРА</h1>
        <button className="start-button" onClick={handleStartGame}>
          {isAuthenticated ? "НАЧАТЬ ИГРАТЬ" : "ВОЙТИ"}
        </button>
        {!isAuthenticated && (
          <p className="register-hint">
            Нет аккаунта?{" "}
            <span
              className="register-link"
              onClick={() => navigate(CLIENT_ROUTES.REGISTER)}
            >
              Зарегистрируйтесь
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
