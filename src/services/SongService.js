import axios from "axios";

const SERVER_URL = "http://localhost:3000";

const getAll = () => {
  	return axios.get(`${SERVER_URL}/songs`);
};

const get = id => {
  	return axios.get(`${SERVER_URL}/song/${id}`);
};

const create = data => {
  	return axios.post(`${SERVER_URL}/song`, data);
};

const update = (id, data) => {
  	return axios.put(`${SERVER_URL}/song/${id}`, data);
};

const remove = id => {
  	return axios.delete(`${SERVER_URL}/song/${id}`);
};

const SongService = {
	getAll,
	get,
	create,
	update,
	remove
};

export default SongService;