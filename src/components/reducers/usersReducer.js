import uuid from 'uuid/dist/v4'
const initialState=[
    
];

const usersReducer=(state=initialState,action)=>{

    switch(action.type){
        case 'addUser':
            return [...state,{
                id:uuid(),
                name:action.payload.name,
                email:action.payload.email,
                dob:action.payload.dob,
                portfolio:action.payload.portfolio,
                hobbies:action.payload.hobbies,
                gender:action.payload.gender,
                skills:action.payload.skills,
            }]
        
        case 'delUser':
            const copyState=[...state];
            const i= copyState.findIndex(x=>x.id===action.payload.id);
            copyState.splice(i,1);
            return [...copyState];

        case 'editUser':
            const editState=[...state];
            const j=editState.findIndex(x=>x.id===action.payload.id);
            Object.keys(editState[j]).map(x=>{
                editState[j][x]=action.payload[x]
            })
            
            return [...editState];

        case 'deleteMultiple':
            const delState=[...state];
            var arr= action.payload;
            arr.map(x=>{
                const i= delState.findIndex(ab=>ab.id===x);
                delState.splice(i,1)
            })
            return[...delState]
            

        default: 
            return state;
    }
}

export default usersReducer