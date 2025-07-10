import { useSelector } from "react-redux";
import { type RootState } from "../store/store";

export const useTheme = () => useSelector((state: RootState) => state.theme.value);
