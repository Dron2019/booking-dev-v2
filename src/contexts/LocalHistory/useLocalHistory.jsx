import { useContext } from "react";
import { LocalHistory } from "./LocalHistoryContext";


export const useLocalHistory = () => useContext(LocalHistory);