
import "./TextField.css"

export default function({label,onChange,id,name,autocomplet="false",type = "text"})
{

    return (
        <div className="TextField">
            <div className="label">
                {label}
            </div>
            <input type={type} name={name} id={id} autocomplet={autocomplet} onChange={(e)=>{
                    onChange(e.target.value)
            }}/>
        </div>
    )
}