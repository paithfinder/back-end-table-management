import request from '@/utils/request'
export const getLoginData=(params)=>{
    return request.post('/operator/login',params)
}