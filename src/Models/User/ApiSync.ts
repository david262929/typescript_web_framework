import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from '../../commons/consts';
import { ID, HaseId } from '../../commons/type';

export class ApiSync<T extends HaseId> {

	fetch (id: ID): Promise<AxiosResponse> {
		return axios.get(`${BASE_URL}/users/${id}`)
	}

	save (data: T): Promise<AxiosResponse> {
		const {id}: HaseId  = data;

		if( id ) {
			return axios.put(`${BASE_URL}/users/${id}`, data);
		}

		return axios.post(`${BASE_URL}/users`, data);
	}
}