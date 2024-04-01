import instance, { END_POINT } from './axiosClient';


export const getMenusAPI = () => {
     return instance.get(`${END_POINT.MENUS}`)
}

export const deleteMenusAPI = (id) => {
     return instance.delete(`${END_POINT.MENUS}/${id}`)
}

export const addMenusAPI = (menu) => {
     return instance.post(`${END_POINT.MENUS}`, menu)
}

export const updateMenusAPI = (id, menu) => {
     return instance.put(`${END_POINT.MENUS}/${id}`, menu)
}
