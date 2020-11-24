

import React, { useState ,useEffect, useContext} from "react";
import "./UsersList.css";

import { UserContext } from "../../contexts/User";
import { Bars} from 'svg-loaders-react'
import AuthentifiedFetch from "../../utils/AuthentifiedFetch"
import "./UsersList.css"

export default function()
{
  
  const [loading, setloading] = useState(true)
  const [users, setUsers] = useState([])



  useEffect(async ()=>
  {
    // Fetching User Data 
     setloading(true)
    let payload = await AuthentifiedFetch("/users");
    console.log(payload)
    setUsers(payload)
    setloading(false)

  },[])


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
              
                
                <span className="icon-button">
                     <img height={20} src="/icons/remove-user.svg"/>
                </span>
                
               
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
             


        </div>
    )
}
