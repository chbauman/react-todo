import { useState } from "react";
import { globalTodoHandler } from "../components/TodoGroup";

export const useRegisteredRerender = (compId: string) => {
  // Hack for enforcing re-render when todos change
  const [dummy, setDummy] = useState<number>(0);
  const reRender = () => setDummy(dummy + 1);
  globalTodoHandler.registerOnChanged(compId, reRender);
};
