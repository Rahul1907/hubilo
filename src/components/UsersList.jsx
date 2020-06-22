import React, { useState } from 'react'
import {connect} from 'react-redux'
import {useSelector,useDispatch} from 'react-redux'
import {delUser,deleteMltp} from './Actions/index'
import AddUser from './AddUser';

function UsersList(props) {
    const dispatch = useDispatch();
    const AllUsers = useSelector((state)=> state.users)
    
    const delUserFun =(e)=>{
        
        dispatch(delUser(e.target.name));
    }
    const addTodelete=(e)=>{
        var name=e.target.name
        
        var userIds=delUserId;
        
        if(e.target.checked){
            userIds['ids'].push(name);
        }
        else{
            const ind=userIds['ids'].indexOf(name)
            if(ind>-1){
                userIds['ids'].splice(ind,1)
            }
        }
        addUserId(prev=>({...prev,userIds}))
        
    }
    const deleteIdPass=()=>{
        
        var Ids=delUserId['ids'];
        dispatch(deleteMltp(Ids));
        delUserId['ids']=[];
    }
    const [delUserId,addUserId]=useState({ids:[]});
    const[delmtp,setMtp]=useState(false);
    const [editbtn,setEditBtn]=useState(false)
    return (
        <div style={{margin:'10px'}}>
            <h1>Users</h1>
            {AllUsers.map(x=>{
                return <div key={x.id}>
                    <li>Name :<b>{x.name}</b> </li>
                    <li>Email : <b>{x.email}</b></li>
                    <li>DOB : <b>{x.dob}</b></li>
                    <li>Porfolio : <b>{x.portfolio}</b></li>
                    <li>Hobbies : <b>{x.hobbies}</b></li>
                    <li>Gender : <b>{x.gender}</b></li>
                    <li>Skills : <b>{x.skills}</b></li>
                    {delmtp && 
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value={x.id} id={x.id} name={x.id} onClick={(e)=>addTodelete(e)}/>
                            <label class="form-check-label" for={x.id}>
                                want to Delete ?
                            </label>
                        </div>
                    }
                    
                    <button onClick={e=>delUserFun(e)} className="btn btn-danger" name={x.id}>Delete</button>
                    <button onClick={()=>setEditBtn(!editbtn)} className="btn btn-success" name={x.id}>Edit</button>
                    
                    {editbtn && <div>
                        <AddUser datapass={x} editDo={editbtn}/>
                    </div>}

                    {/* {Object.values(delUserId).length > 1 && <button className="btn btn-dark" onClick={deleteIdPass}> Delete Selected </button> } */}
                    {/* <button onClick={e=>}>Edit </button> */}
                </div>
            })}
            {AllUsers && AllUsers.length > 1
                && <button className="btn btn-primary" onClick={()=>setMtp(!delmtp)}> Delete Multiple</button>
            }    
            {delUserId['ids'] && delUserId['ids'].length>1 && <button className="btn btn-dark" onClick={deleteIdPass}> Delete Selected </button> }

        </div>
    )
}

export default connect(
    null,
    {delUser,deleteMltp}
)(UsersList)
