import React,{ useState,useEffect } from 'react'
import {Link,useHistory} from 'react-router-dom'
import {useDispatch,connect} from 'react-redux'
import {addUser,editUser} from './Actions/index'
function AddUser(props) {
    const history =useHistory();
    const dispatch= useDispatch();
    
    const [data,setData]=useState({
        name:props.datapass && props.datapass.name?props.datapass.name:'',
        email:props.datapass && props.datapass.email?props.datapass.email:'',
        dob:props.datapass && props.datapass.dob?props.datapass.dob:'',
        portfolio:props.datapass && props.datapass.portfolio?props.datapass.portfolio:'',
        hobbies:props.datapass && props.datapass.hobbies?props.datapass.hobbies:[],
        gender:props.datapass && props.datapass.gender?props.datapass.gender:null,
        skills:props.datapass && props.datapass.skills?props.datapass.skills:[],
    })
    const[formErrors,setErrors]=useState({
        name:'',
        email:'',
        dob:'',
        portfolio:'',
        hobbies:'',
        gender:'',
        skills:'',
    })
    
    const handleChange =(e)=>{
        e.persist();
        var value=e.target.value;
        var name=e.target.name;
        var errors = formErrors;
        setData(prev =>({...prev, [name]:value }))
        if(formErrors[name].length>0){
            
            switch(name){
                case 'name':
                    if(value.length>4 && value.length<21){
                        
                        errors[name]='';
                    }
                    setErrors(prev=>({...prev,errors}));
                    break;
    
                case 'email':
                    var mailExp=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if(mailExp.test(value)){
                        errors[name]='';
                    }
                    setErrors(prev=>({...prev,errors}));
                    break;

                case 'dob':
                    var arr=value.split('-')
                    if(parseInt(arr[0]) <2001 && parseInt(arr[0])>1950){
                        errors[name]='';
                    }
                    setErrors(prev=>({...prev,errors}));
                case 'portfolio':
                    var pattern='https://.*'
                    if( value.match(pattern)){
                        errors[name]='';
                    }
                    setErrors(prev=>({...prev,errors}));
                    
                    break;
                case 'gender':
                    if(formErrors[name].length>0){
                        if(value!=null){
                            errors[name]='';
                        }
                        setErrors(prev=>({...prev,errors}));
                    }
                    
                    break;
                default :
                    break;
            }
        }
        
    }

    const handleCheck=(e)=>{
        var name=e.target.name;
        var errors=formErrors;
        var pass=data;
        if(e.target.checked){
            pass[name].push(e.target.value)
        }
        else{
            const ind=pass[name].indexOf(e.target.value);
            if(ind>-1){
                pass[name].splice(ind,1);
            }
        }
        setData(prev=>({...prev,pass}));
        if(formErrors[name].length>0){
            
            switch(name){
                case 'hobbies':
                    if(data[name].length>=1){
                        errors[name]='';
                    }
                    setErrors(prev=>({...prev,errors}));
                    break;
                case 'skills':
                    if(data[name].length>=1){
                        errors[name]='';
                    }
                    setErrors(prev=>({...prev,errors}));
                    break;
                default :
                    break;
            }
        }
    }

    const handleRadio=(e)=>{
        var value=e.target.value;
        var name=e.target.name;
        var errors=formErrors;
        setData(prev=>({...prev,[name]:value}))
        if(formErrors[name].length>0){
            if(value!=null){
                errors[name]='';
            }
            setErrors(prev=>({...prev,errors}));
        }
        
    }
    const addUserFun=()=>{

        
        var hasError=false;
        Object.keys(formErrors).map(x=>{
            var errors=formErrors;
            switch(x){
                case 'name':
                    if(data[x].length<5 || data[x].length>20){
                        errors[x]=' Value length should be Between 5-20';
                        hasError=true;
                    }
                    else
                        errors[x]='';
                    setErrors(prev=>({...prev,errors}));
                    break;
                case 'email':
                    var mailExp=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if(!mailExp.test(data[x]) || data[x]==''){
                        errors[x]=' Wrong Email Address'
                        hasError=true;
                    }
                    else
                        errors[x]='';
                    setErrors(prev=>({...prev,errors}));
                    break;
                case 'dob':
                    var arr=data[x].split('-')
                    if((parseInt(arr[0]) >2000 || parseInt(arr[0])<1951 )|| data[x]==''){
                        errors[x]="Date Should be between 1/1/1951 and 31/12/2000";
                        hasError=true;
                    }
                    else
                        errors[x]='';
                    setErrors(prev=>({...prev,errors}));
                    break;
                case 'portfolio':
                    var pattern='https://.*'
                    if( !data[x].match(pattern) || data[x]==''){
                        errors[x]='Not a valid URL'
                        hasError=true;
                    }
                    else
                        errors[x]='';
                    setErrors(prev=>({...prev,errors}));
                    
                    break;
                case 'hobbies':
                    if(data[x].length<1){
                        errors[x]='Aleats one Hobbie should be selected'
                        setErrors(prev=>({...prev,errors}));
                        hasError=true;
                    }
                    else
                        errors[x]='';
                    setErrors(prev=>({...prev,errors}));
                    break;
                case 'gender':
                    if(data[x]==null){
                        errors[x]='Select Gender'
                        hasError=true;
                    }
                    else
                        errors[x]='';
                    setErrors(prev=>({...prev,errors}));
                    
                    break;
                case 'skills':
                    if(data[x].length<1){
                        errors[x]='Aleats one Skill should be selected'
                        hasError=true;
                    }
                    else
                        errors[x]='';
                    setErrors(prev=>({...prev,errors}));
                    break;
                default :
                    break;
            }
                
        })

        
        if(!hasError){
            if(props.editDo){
                data['id']=props.datapass.id;
                dispatch(editUser(data));
            }
            else{
                dispatch(addUser(data));
                history.push("/");
            }
        }
        
        
    }
    

    return (
        <div>
            
            {!props.editDo && <Link to="/"> Back</Link> }


            <div className="form-group">
                <label htmlFor="uname">Name:</label>
                <input type="text" name="name" placeholder="Name" value={data.name?data.name:''}  onChange={(e)=>handleChange(e)} className="form-control" id="uname" required></input>
                {formErrors.name.length>0 && <p className="alertmsg">{formErrors.name}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="pwd">Email:</label>
                <input type="email" name="email" placeholder="Email ID" value={data.email?data.email:''} onChange={(e)=>handleChange(e)} className="form-control" required></input>
                {formErrors.email.length>0 && <p className="alertmsg">{formErrors.email}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="example-datetime-local-input" className="col-form-label" >Date and time :</label>
                <input className="form-control" type="date" onChange={(e)=>handleChange(e)} name="dob" value={data.dob} ></input>
                {formErrors.dob.length>0 && <p className="alertmsg">{formErrors.dob}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="" className="col-form-label" >Portfolio link:</label>
                <input type="url" className="form-control" name="portfolio" value={data.portfolio} onChange={(e)=>handleChange(e)}/>
                {formErrors.portfolio.length>0 && <p className="alertmsg">{formErrors.portfolio}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="" className="col-form-label">Hobbies:</label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Danceing" name="hobbies" checked={data.hobbies?data.hobbies.includes('Danceing'):false} onClick={e=>handleCheck(e)} id="defaultCheck1"></input>
                    <label className="form-check-label" for="defaultCheck1">
                        Danceing
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Singing" name="hobbies" checked={data.hobbies?data.hobbies.includes('Singing'):false} onClick={e=>handleCheck(e)} id="defaultCheck2"></input>
                    <label className="form-check-label" for="defaultCheck2">
                        Singing
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Others" name="hobbies" checked={data.hobbies?data.hobbies.includes('Others'):false} onClick={e=>handleCheck(e)} id="defaultCheck3"></input>
                    <label className="form-check-label" for="defaultCheck3">
                        Others
                    </label>
                </div>
                {formErrors.hobbies.length>0 && <p className="alertmsg">{formErrors.hobbies}</p>}
            </div>
            <div className="form-group">
            <label htmlFor="" className="col-form-label">Gender:</label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" checked={data.gender==='Male'} value="Male"  id="inlineRadio1" onClick={e=>handleRadio(e)} />
                    <label className="form-check-label" for="inlineRadio1">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" checked={data.gender==='Female'} value="Female" id="inlineRadio2" onClick={e=>handleRadio(e)} />
                    <label className="form-check-label" for="inlineRadio2">Female</label>
                </div>
            </div>
            {formErrors.gender.length>0 && <p className="alertmsg">{formErrors.gender}</p>}
            <div className="form-group">
                <label htmlFor="" className="col-form-label">Skills:</label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="DBMS" checked={data.skills?data.skills.includes('DBMS'):false} onClick={e=>handleCheck(e)} name="skills" id="defaultCheck4"></input>
                    <label className="form-check-label" for="defaultCheck4">
                        DBMS
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="OOPS" checked={data.skills?data.skills.includes('OOPS'):false} onClick={e=>handleCheck(e)} name="skills" id="defaultCheck5"></input>
                    <label className="form-check-label" for="defaultCheck5">
                        OOPS
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Others" checked={data.skills?data.skills.includes('Others'):false} onClick={e=>handleCheck(e)} name="skills" id="defaultCheck6"></input>
                    <label className="form-check-label" for="defaultCheck6">
                        Others
                    </label>
                </div>
                {formErrors.skills.length>0 && <p className="alertmsg">{formErrors.skills}</p>}
            </div> 
            {props.editDo &&  <button className="btn btn-success" onClick={addUserFun}>Edit</button>}
            {!(props.editDo) && <button className="btn btn-primary" onClick={addUserFun}>Add</button> }           
            
        </div>
    )
}

// const mapDispatchToProps=()=>{
//     addUser
// }

export default connect(
    // mapDispatchToProps,
    null,
    {addUser}
)(AddUser)
