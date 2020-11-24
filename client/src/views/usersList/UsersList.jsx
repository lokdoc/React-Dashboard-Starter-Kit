

import React, { useState , useContext} from "react";
import "./UsersList.css";

import { UserContext } from "../../contexts/User";


export default function()
{
  const {user,setUser} = useContext(UserContext)

  const DUMMY = [
      { id : "ADM-001" , username:"LOKDOC" ,firstname : "Belahda" , lastname : "lokmene", email:"lokdoc@hotmail.fr" },
      { id : "ADM-001" , username:"LOKDOC" ,firstname : "Belahda" , lastname : "lokmene", email:"lokdoc@hotmail.fr" },
      { id : "ADM-001" , username:"LOKDOC" ,firstname : "Belahda" , lastname : "lokmene", email:"lokdoc@hotmail.fr" },
      { id : "ADM-001" , username:"LOKDOC" ,firstname : "Belahda" , lastname : "lokmene", email:"lokdoc@hotmail.fr" },
      { id : "ADM-001" , username:"LOKDOC" ,firstname : "Belahda" , lastname : "lokmene", email:"lokdoc@hotmail.fr" }
  ]



  function GenerateList(array)
  {
      let items = array.map((i,index)=>{
         let id =i.id
         
        return(
        <tr key={index}>
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

    return(
        <div className="users_list">
            <h1> Users Management </h1>
          

              <div className="center">

                  { GenerateList(DUMMY)}
              </div>
             


        </div>
    )
}
