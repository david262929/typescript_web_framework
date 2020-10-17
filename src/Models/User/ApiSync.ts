import axios, { AxiosResponse } from 'axios'
import { ID, HaseId } from '../../commons/type';
const baseURL = 'http://localhost:3000';

export class ApiSync<T extends HaseId> {

	fetch (id: ID): Promise<AxiosResponse> {
		return axios.get(`${baseURL}/users/${id}`)
	}

	save (data: T): Promise<AxiosResponse> {
		const {id}: HaseId  = data;

		if( id ) {
			return axios.put(`${baseURL}/users/${id}`, data);
		}

		return axios.post(`${baseURL}/users`, data);
	}
}