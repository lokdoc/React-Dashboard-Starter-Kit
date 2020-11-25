

import React, { useState ,useEffect, useContext} from "react";
import "./UsersList.css";

import { UserContext } from "../../contexts/User";
import { Bars} from 'svg-loaders-react'
import AuthentifiedFetch from "../../utils/AuthentifiedFetch"
import MessageBox from '../../components/MessageBox/MessageBox'
import "./UsersList.css"

export default function()
{
  
  const [ msgBox, setMsgBox] = useState(false)
  const [ users, setUsers] = useState([])
  const [loading,setLoading] = useState(false);
  const [toBeRemoved,setToBeRemoved] = useState({});


  const {user} = useContext(UserContext)

  useEffect(async ()=>
  {
    // Fetching User Data 
    
    setLoading(true)
    
    let payload = await AuthentifiedFetch("/users");
    
    setUsers(payload)
    
    setLoading(false)

  },[])


  async function RemoveUser(id)
  {
      
    let payload = await AuthentifiedFetch("/profile",{ remove : id });
    setUsers( users.filter( u => u.id != id ))

  }


  function GenerateList(array)
  {
      let items = array.map((i,index)=>{
         let id =i.id
         
        return(
        <tr key={id}>
            <td>{id}</td>
            <td>{i.username}</td>
            <td>{i.firstname}</td>
            <td>{i.lastname}</td>
            <td>{i.email}</td>
            <td>
              
                
               { user.id != id ?
                ( 
                <span onClick={(e) => 
                    {
                        setToBeRemoved(i)
                        setMsgBox(true)
                    }
                
                } className="icon-button">
                     <img height={20} src="/icons/remove-user.svg"/>
                </span>
                ):null
                }
               
            </td>
        </tr>)

      })
      return (

        <table border={"true"}>
            <colgroup>
                    <col width={100}/>
                    <col width={150}/>
                    <col width={150}/>
                    <col width={150}/>
                    <col width={250}/>
                    <col width={150}/>      
            </colgroup>
           
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>E-Mail</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>
      )
        
  }



  if(loading)
  return(
    <div className="loading">
        <Bars fill="brown" />
    </div>
  )
  else
  return(
        <div className="users_list">
            <h1> Users Management </h1>
          

              <div className="center">
                 { GenerateList(users)}
              </div>
             <MessageBox 
            isOpen={msgBox}
            title="Remove User"
            icon="/icons/error.svg"
            HeaderColor="brown"
            AcceptLabel="YES"
            CancelLabel="NO"

            onAccept={()=>{
                RemoveUser(toBeRemoved.id)
                setMsgBox(false)
            }}
            onClose={()=>setMsgBox(false)}
         >
           <h1>Warning</h1>
           <p style={{fontSize:16}}>
              Are you sure you want to delete the user <b>"{toBeRemoved.username}" ?</b> <br/>
           </p>

           </MessageBox> 


        </div>
    )
}
