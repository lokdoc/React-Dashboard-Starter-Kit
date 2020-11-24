
import {useState} from 'react'
const validator = require('validator');


import "./InputField.css"


export default function({   id,
                            required = null,
                            label,
                            validation,
                            onChange,
                            name,
                            autocomplete="chrome-off",
                            type = "text",
                            errorMessage = "",
                            value,
                            pattern,
                            disabled = false
                            })
{

    const [error, setError] = useState("")

    // Defining Validation Patterns on DOM 
    if(validation == "username")
        pattern="[A-Za-z0-9._]{3,}"
    
    /*
        # RFC 5322
        We use native HTML 
        https://emailregex.com/
    */

    if(validation == "email")
        type="email"



    return (
        <div className="InputField">
            <div className="label">
                {label} {required ? (<span className="required">*</span>):null}
            </div>
            <input  value={value} 
                    pattern={pattern} 
                    disabled={disabled} 
                    type={type} 
                    id={id} 
                    autoComplete={autocomplete} 
                    required={required}
                    ref={(c) => 
                        { 
                            
                        
                       }}
                    onChange={(e)=>{
                    
                   
                   
                    if(e.target.value &&  e.target.value.length == 0)
                    {
                        e.target.className="";
                        setError("");
                        return;
                    }

                    
                    if(e.target.checkValidity())
                    {
                        e.target.className = "correct"
                        setError("")
                    }
                    else
                    {
                        setError(errorMessage)
                        e.target.className = "error"
                    }
                    
                    // add Required Message 
                    if(!e.target.checkValidity() && e.target.value.length == 0)
                    {
                        e.target.className = "error"
                        setError("This Field is required !")
                       
                    }

                    onChange(e.target.value)
            }}/>
            {error.length > 1 ? ( <span className="error_info">{error}</span> ) : null}
           
        </div>
    )
}