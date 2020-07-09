import React,{useState} from 'react';
import {connect} from 'react-redux';
import * as contactAction from './actions/contactAction';

const App = (props) =>{
  const [state,setState]=useState({
    name:'',
    phone:'',
    file:''
  })
  const onChange = (e)=>{
    setState({...state,
      [e.target.name]:e.target.value
      
    })
  }
  const onSubmit = (e) =>{
    e.preventDefault();
  let contact ={
  name:state.name,
  phone:state.phone,
  file:state.file
  }
  setState({
    name:'',
    phone:'',
    file:''
  })
    props.createContact(contact);
  }
  const listView =(data, index) =>{
    return (
      <div className="row">
        <div className="col-md-10">
          <li key={index} className="list-group-item clearfix">
            {data.name}
            {data.phone}
            <img alt=" " style={{ width: "10%" }} src={data.file} />
          </li>
        </div>
        <div className="col-md-2">
          <button onClick={(e) => deleteContact(e, index)} className="btn btn-danger">
            Remove
          </button>
        </div>
    </div> 
    )
  }
  const deleteContact = (e, index) => {
    e.preventDefault();
    props.deleteContact(index);
  };
  return(
   <div>
     <h2>Contact Application</h2>
     { <ul>
          {props.contacts.map((contact, i) => <li key={i}>{contact.file}</li> )}
        </ul> }
     <div>
     <form onSubmit={e =>onSubmit(e)}>
     <input type="text" name="name" onChange={e =>onChange(e)} /><br/>
     <input type="text" name="phone" onChange={e =>onChange(e)} /><br/>
     <input type ="file" name="file" onChange={(event)=>setState({...state,file: URL.createObjectURL(event.target.files[0])})}/>
     <input type="submit" className="btn btn-success" value="ADD"/>
     </form>
     { <ul className="list-group">
          {props.contacts.map((contact, i) => listView(contact, i))}
        </ul> }
     </div>
   </div>
  )
}

const mapStateToProps = (state,ownProps) =>{
  return{
    contacts:state.contacts
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    createContact:contact =>dispatch(contactAction.createContact(contact)),
    deleteContact: index =>dispatch(contactAction.deleteContact(index))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
