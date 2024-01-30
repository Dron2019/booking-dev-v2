import { useContext } from "react";
import { FlatContext } from "./FlatContextProvider";


export const useFlat = () => useContext(FlatContext);