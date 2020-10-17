export type ID = number
export interface HaseId { id?: ID };

export type Callback = (...params: any) => any

export interface List<T> {
	[key: string]: T,
}