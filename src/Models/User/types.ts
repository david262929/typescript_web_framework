import { ID } from "../../commons/type";

export interface UserProps{
    id?: ID,
    name?: string,
    age?: number,
}

export type Callback = (...params: any) => void

export interface UserEvents {
    [key: string]: Callback[],
}