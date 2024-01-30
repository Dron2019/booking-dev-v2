import { useContext } from "react";
import { DiscountContext } from "./DiscountContext";


export const useDiscount = () => useContext(DiscountContext);