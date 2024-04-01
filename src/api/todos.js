import instance, { END_POINT } from './axiosClient';


export const getTodosAPI = () => {
     return instance.get(`${END_POINT.TODOS}`)
}

export const deleteTodosAPI = (id) => {
     return instance.delete(`${END_POINT.TODOS}/${id}`)
}

export const addTodosAPI = (todo) => {
     return instance.post(`${END_POINT.TODOS}`, todo)
}

export const updateTodosAPI = (todo) => {
     return instance.put(`${END_POINT.TODOS}`, todo)
}
