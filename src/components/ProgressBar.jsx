import {useEffect, useState} from 'react'

const TIMER = 3000

const ProgressBar = ( {timer} ) => {

    const [remainingTime, setRemainingTime] = useState(timer)

    useEffect ( ()=>{
        
      const intervalTimer = setInterval( ()=> {
        console.log('INTERVAL')
        setRemainingTime( prevTime=> prevTime-10)
      }, 10);
  
      return () =>{
        clearInterval(intervalTimer)
      }
  
    }, [])


  return (
    <progress value={remainingTime} max={timer} />
  )
}

export default ProgressBar