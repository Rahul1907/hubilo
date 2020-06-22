
export const addUser=(obj)=>{
    
    return ({type:'addUser',payload:obj});
}

export const delUser=(id)=>{
    
    return ({type:'delUser',payload:id});
}

export const editUser=(obj)=>{

    return ({type:'editUser',payload:obj});
}

export const deleteMltp=(arr)=>{
    
    return ({type:'deleteMultiple',payload:arr})
}