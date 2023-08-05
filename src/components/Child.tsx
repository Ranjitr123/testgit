import React from 'react'

function Child({msgchange}:any) {

  
  return (
    <div>


<button onClick={()=>{msgchange("new data went")}}>click to change</button>

    </div>
  )
}

export default Child