import { useEffect } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal=({ open, children, onClose}) =>{
  const dialog = useRef();

  useEffect( ()=>{
    open ? dialog.current.showModal() : dialog.current.close()
  }, [open] )


  //dialog.current.showModal(); // for modal overlay
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}> 
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
