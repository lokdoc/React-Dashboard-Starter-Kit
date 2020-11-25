import {useEffect,useRef} from 'react'

import Modal from 'react-modal';
import "./MessageBox.css"


export default function({
                            isOpen,
                            HeaderColor = "#333",
                            icon,
                            onAccept,
                            AcceptLabel,
                            CancelLabel = "CLOSE",
                            onClose,
                            children})
{
    const closeRef = useRef(null);

    useEffect(() => {
        Modal.setAppElement('body');
    })

    const ModalStyle = {
        content : {
          top                   : '40%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          width                 : '30%',
          transform             : 'translate(-50%, -50%)',
          padding               : 0,
          borderRadius          : 0,
          textAlign             : 'center',
          border                : 0,
          boxShadow             : '0 2px 10px 5px rgba(0,0,0,0.3)'
        }
      };

    return(
        <Modal
            isOpen={isOpen}
            style={ModalStyle}
            >
                <div className="messagebox">
                    <div className="header" style={{background:HeaderColor}}>
                        <img height={50} src={icon}/>
                    </div>
                    <div className="body">
                    {children}
                    </div>
                    <div className="footer">

                           
                            <input type="button" onClick={onClose} value={CancelLabel}/>
                            <input style={{background:"brown",color:"#fff"}} type="button" onClick={onAccept} value={AcceptLabel}/>
                    </div>
                </div>
            

        </Modal>
    )
}