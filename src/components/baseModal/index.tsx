import { ReactNode } from "react";

interface BaseModalProps {
    onClose?:()=>void;
    children:ReactNode;
    title:string
}
const BaseModal = (props:BaseModalProps)=>{
    return <div className="modal-x"  >
     <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
          <button 
          onClick={props.onClose}
          type="button" className="btn" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
      </div>
    </div>
  </div>
}
export default BaseModal;