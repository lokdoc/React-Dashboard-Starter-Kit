
import "./TextField.css"

export default function({label,onChange,type = "text"})
{

    return (
        <div className="TextField">
            <div className="label">
                {label}
            </div>
            <input type={type} name="" id="" onChange={(e)=>{
                    onChange(e.target.value)
            }}/>
        </div>
    )


}