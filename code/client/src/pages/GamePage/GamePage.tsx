import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import React, { useState } from "react";

export default function GamePage() {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);
  const answer = useAppSelector((state) => state.answer);
  const question = useAppSelector((state) => state.question);
  const [score, setScore] = useState(0);

  return (
    <>
      <div className="container" style={{ background: "white" }}>
        {" "}
        полный бред
      </div>
    </>
  );
}
