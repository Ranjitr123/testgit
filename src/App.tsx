import axios from "axios";
import React, { useEffect, useReducer, useState,useMemo } from "react";
import "./App.scss";
import Data from "./components/Data";
import Reackhook from "./components/Reackhook";

let url = "http://localhost:3033/posts";

const reducer = (state:any,action:any)=>{
    switch (action.type){
      case "increment" : return (state+1);
      case "decrement" : return (state - 1)
    }
}


function App() {
 
   const [isdarktheme, setIsdarktheme] = useState(false)
  const [state, dispatch] = useReducer(reducer,5)
  const [data, setdata] = useState([]);
  const [edit, setEdit] = useState(true)
  const [formdata, setFormdata] = useState({
    email: "",
    name: "",
    password: "",
  });

  function toggletheme(){
    setIsdarktheme((prev)=>!prev)
  }

  function handlechange(e: any) {
    const { name, value } = e.target;
    // console.log(name,value)
    setFormdata({
      ...formdata,
      [name]: value,
    });
  }
  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  function formsubmit(e: any) {
    e.preventDefault();
    console.log(formdata);
    axios
      .post(url, formdata, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        getData();
        setFormdata({
          email: "",
          name: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const deletedata = (id: any) => {
    axios
      .delete(`http://localhost:3033/posts/${id}`)
      .then((datanew) => {
        console.log("data deleted", datanew);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function Edit(itemid:any){
   setEdit(false)
    axios
      .get(`http://localhost:3033/posts/${itemid}`)
      .then((res) => {
        console.log(res.data);
        // const { name, value } = e.target;
        // console.log(name,value)
        let filledData = res.data
        setFormdata({
          ...formdata,
         email:filledData.email,name:filledData.name,password:filledData.password
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const updataData = (id:any) => {
  setEdit(true)
   axios.put(`http://localhost:3033/posts/${id}`,formdata,{
    method:"PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

   }).then((res)=>{
    console.log(res)
    getData()
    setFormdata({
      email: "",
      name: "",
      password: "",
    });
   }).catch((err)=>{
    console.log(err)
   })
  };
  return (
    <div className={isdarktheme ? 'dark-theme' : ''}>
      <Reackhook />
  <h2>Change Theme Example</h2>
      <p>Primary Color: {isdarktheme ? 'purple' : 'blue'}</p>
      <p>Secondary Color: {isdarktheme ? 'darkred' : 'red'}</p>
    <button onClick={toggletheme}>toggle theme</button>
         
      <div className="container">
        <h1>{state}</h1>
    <button onClick={()=>dispatch({type:"increment"})}>increment</button>
    <button onClick={()=>dispatch({type:"decrement"})}>decrement</button>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6 my-5">
            <h1 className="text-center text-success text-decoration-underline">
              Basic Forms
            </h1>
            <form onSubmit={formsubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formdata.email}
                  onChange={handlechange}
                  id="email"
                  className="form-control"
                  placeholder="Please Enter your email"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  required
                  name="name"
                  id="name"
                  value={formdata.name}
                  onChange={handlechange}
                  className="form-control"
                  placeholder="Please Enter your Name"
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  required
                  name="password"
                  id="password"
                  value={formdata.password}
                  onChange={handlechange}
                  className="form-control"
                  placeholder="Please Enter your password"
                  autoComplete="off"
                />
              </div>
              <div className="text-center">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-6">
            <table>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Password</th>
                <th>Delete</th>
               
                <th>Update</th>
              </tr>
              {data.map((item: any) => (
                <>
                  <tr key={item.id} className="text-success text-center">
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>{item.password}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deletedata(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                        {
                          edit ? <div>  <td>
                          <button type="submit" className="btn btn-info"  onClick={()=>Edit(item.id)}>Edit</button>
                          </td></div>: <div><td>
                    <button type="submit" className="btn btn-success" onClick={()=>updataData(item.id)}>Update</button>
                    </td></div>
                        }

                    </td>
                  
                    
                  </tr>
                </>
              ))}
            </table>
          </div>
        </div>
      </div>
   
   
     <div className="container">
       <Data />
     </div>

   
   
    </div>
  );
}

export default App;
