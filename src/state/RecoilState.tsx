import { atom } from "recoil";
import { IColorItem } from "../types/Types";

export const palletteAtom = atom<IColorItem[]>({
    key: 'palletteAtom',
    default: [],
    dangerouslyAllowMutability: false,
});