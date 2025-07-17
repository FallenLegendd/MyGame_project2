import { useEffect } from "react";
import { useAppDispatch } from "../shared/hooks/reduxHooks";
import { refreshTokensThunk } from "@/entities/user/api/UserApi";
import Router from "./Router/Router";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshTokensThunk());
  }, [dispatch]);

  return <Router />;
}
