import { useContext } from "react";
import { EventContext } from "./EventContext.js";

export function useEvents() {
  return useContext(EventContext);
}
