
import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  
  // const [remainingTime, setRemainingTime] = useState(TIMER)

  // useEffect ( ()=>{
      
  //   const intervalTimer = setInterval( ()=> {
  //     console.log('INTERVAL')
  //     setRemainingTime( prevTime=> prevTime-10)
  //   }, 10);

  //   return () =>{
  //     clearInterval(intervalTimer)
  //   }

  // }, [])
  

  useEffect(()=>{
    console.log('TIMER SET')
    const setTimer = setTimeout( () => {
      onConfirm();
    }, 3000)

    return () =>{
      console.log('cleaning up timer')
      clearTimeout(setTimer)
    }
    // using calback when passing function as a dependencies
  }, [onConfirm]) //pointing at the dependency
  
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER}/>
    </div>
  );
}
