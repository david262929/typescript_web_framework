import axios, { AxiosResponse } from 'axios'
import { ID, HaseId } from '../../commons/type';
const baseURL = 'http://localhost:3000';

export class Sync<T extends HaseId> {
	async fetch (id: ID): Promise<void> {
		const response: AxiosResponse = await axios.get(`${baseURL}/users/${id}`);
		return Promise.resolve(response.data)
	}

	async save (data: T): Promise<void> {
		const {id}: HaseId  = data;

		if( id ) {
			return await axios.put(`${baseURL}/users/${id}`, data);
		}

		return await axios.post(`${baseURL}/users`, data);
  }
}