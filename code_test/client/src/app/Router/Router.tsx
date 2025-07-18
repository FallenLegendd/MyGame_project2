import { Route, Routes } from "react-router";
import Layout from "../Layout/Layout";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import SignInForm from "@/features/auth/ui/SignInForm/SignInForm";
import SignUpForm from "@/features/auth/ui/SignUpForm/SignUpForm";
import MainPage from "@/pages/MainPage/MainPage";
import GamePage from "@/pages/GamePage/GamePage";
import StatePage from "@/pages/StatePage/StatePage";
import QuizPage from "@/pages/QuizPage/QuizPage";
import ResultPage from "@/pages/ResultPage/ResultPage";

export default function Router() {
  return (
    <Routes>
      <Route path={CLIENT_ROUTES.HOME} element={<Layout />}>
        <Route path={CLIENT_ROUTES.HOME} element={<MainPage />} />
        <Route path={CLIENT_ROUTES.GAME} element={<GamePage />} />
        <Route path={CLIENT_ROUTES.RESULT} element={<StatePage />} />
        <Route path={CLIENT_ROUTES.LOGIN} element={<SignInForm />} />
        <Route path={CLIENT_ROUTES.REGISTER} element={<SignUpForm />} />
        <Route path={CLIENT_ROUTES.QUIZ} element={<QuizPage />} />
        <Route path={CLIENT_ROUTES.QUIZ_RESULT} element={<ResultPage />} />
      </Route>
    </Routes>
  );
}
