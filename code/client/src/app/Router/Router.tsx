import { Route, Routes } from "react-router";
import Layout from "../Layout/Layout";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import SignInForm from "@/features/auth/ui/SignInForm/SignInForm";
import SignUpForm from "@/features/auth/ui/SignUpForm/SignUpForm";

export default function Router() {
  return (
    <Routes>
      <Route path={CLIENT_ROUTES.HOME} element={<Layout />}>
        {/* <Route path={CLIENT_ROUTES.HOME} element={<MainPage />} /> */}
        <Route path={CLIENT_ROUTES.LOGIN} element={<SignInForm />} />
        <Route path={CLIENT_ROUTES.REGISTER} element={<SignUpForm />} />
      </Route>
    </Routes>
  );
}
