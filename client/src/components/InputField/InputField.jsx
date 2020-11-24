
import {useState} from 'react'
const validator = require('validator');


import "./InputField.css"


export default function({   id,
                            required = false,
                            label,
                            validation,
                            onChange,
                            name,
                            autocomplete="chrome-off",
                            type = "text",
                            value,
                            disabled = false
                            })
{

    const [error, setError] = useState("")

    return (
        <div className="InputField">
            <div className="label">
                {label} {required ? (<span className="required">*</span>):null}
            </div>
            <input value={value} disabled={disabled} type={type} id={id} autoComplete={autocomplete} onChange={(e)=>{
                    
                    if(e.target.value.length == 0)
                    {
                        e.target.className="";
                        setError("");
                        return;
                    }

                    if(validation == "email")
                    {
                        if(validator.isEmail(e.target.value))
                        {
                            e.target.className = "correct"
                            setError("")
                        }
                        else
                        {
                            e.target.className = "error"
                            setError("Format email invalid")
                        }
                         

                    }
                    if(validation == "firstname")
                        e.target.className = e.target.value.length <= 100 ? "correct" : "error";
                   
                    if(validation == "lastname")
                        e.target.className = e.target.value.length <= 100 ? "correct" : "error";
                   
                    
                    if(validation == "username")
                        e.target.className = validator.matches(e.target.value ,/[a-zA-Z0-9_.]{3,}/ ) ? "correct" : "error";
                   
                    



                    onChange(e.target.value)
            }}/>
            {error.length > 1 ? ( <span className="error_info">{error}</span> ) : null}
           
        </div>
    )
}