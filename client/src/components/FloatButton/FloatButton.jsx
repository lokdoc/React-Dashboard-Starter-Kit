

import "./FloatButton.css"


export default function({ icon="/icons/add-user.svg",onClick })
{

    return(
        <div onClick={onClick} className="floatButton">
            <img src={icon}/>
        </div>
    )



}