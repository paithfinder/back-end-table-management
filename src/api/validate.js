import request from '@/utils/request'
export const validate=()=>{
    return request.get('/operator/captcha')
}