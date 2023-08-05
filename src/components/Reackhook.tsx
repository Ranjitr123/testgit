import React,{useState} from 'react';


function Reackhook() {
    // const [count,setCount]= useState(7)
//    const state = useState(5)
//     const count = state[0]
    
//     const setCount = state[1]

//     const increment = ()=>{
//         setCount(count+1)
//     }
const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

const state = useState(5)
const count = state[0]
 const setCount = state[1]
 const incre = ()=>{
    setCount(count+1)
 }

console.log(state)

const updateColor = () => {
    setCar({color: "blue"})
  }
  return (
    <div>
        <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button
        type="button"
        onClick={updateColor}
      >Blue</button>
   
    <h1>{count}</h1>
    <button onClick={incre}>increase the value</button> 

  <h1>this is vivek</h1>

    </div>
  )
}

export default Reackhook