import request from '@/utils/request'
export const addTable=(params)=>{
    return request.post('/letters',params)
}
export const addMedia=(data)=>{
    return request.post('/media',data,{headers:{'Content-Type': 'multipart/form-data'}})
}
export const deleteTable=(id)=>{
    return request.delete(`/letters/${id}`)
}
export const changeTable=(id,params)=>{
    return request.put(`/letters/${id}`,params)
}
export const getTable=(params)=>{
    return request.get('/letters',params)
}
export const findTable=(params)=>{
    return request.get('/letters', params)
}
export const downLoadFile=(page,pageSize,year)=>{
    return request.downLoad(`/report/total/export?page=${page}&pageSize=${pageSize}&year=${year}&institution=`)
}