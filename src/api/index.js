import myAxios from './myAxios'

export const reqLogin = values => myAxios.post('/users/login', values)
