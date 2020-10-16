export interface UserProps{
    name: string,
    age: number,
}
export interface UserPropsNonMandatory{
    name?: string,
    age?: number,
}

export type Callback = () => void

export interface UserEvents {
    [key: string]: Callback[],
}