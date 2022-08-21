import { useAppSelector } from "../../store/hook";
import { RootState } from "../../store/store";

export const useAlert = () => {
    const message = useAppSelector((state: RootState) => state.alert.message);
    const type = useAppSelector((state: RootState) => state.alert.type);

    return {
        message,
        type
    }
}