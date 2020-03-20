import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ReactTable from "react-table";  
//import "react-table/react-table.css"; 

class App extends Component{

  

  state = {
    device_id : null,
    timestamp : null,
    data : null,
    columns : null,
    dataSource: {}
  };

  constructor(props) {
    super(props);
	
  }

onChangeHandler1 = (event) => {
  const device_id = event.value;
  console.log(device_id);
  this.setState({device_id:device_id});
};

onChangeHandler2 = (event) => {
  const timestamp = event.value;
  console.log(timestamp);
  this.setState({timestamp:timestamp});
};

 onSubmitHandler = async() => {
    const response = await fetch('https://e01jb75ql8.execute-api.us-east-2.amazonaws.com/Test?device_id='+this.state.device_id+'&timestamp='+this.state.timestamp,{method: 'GET'}) .then((response) => {
      return response.json();
      
  },function(err){
    console.log(err);
  });
  console.log(JSON.parse(response.body).done.Items);  
  
const data = JSON.parse(response.body).done.Items;
console.log(data)

 let checkVariable = () =>{

  if (typeof data !== "undefined") {
    console.log(JSON.parse(response.body).done.Items)
    const s = JSON.parse(response.body).done.Items
    this.setState({data:s})
  }
}

setTimeout(checkVariable, 1000);

//this.setState({data:JSON.parse(response.body).done.Items})
this.setState({columns:[{  
  Header: 'Device_ID',  
  accessor: 'Device_ID'  
  },{  
  Header: 'timestamp',  
  accessor: 'timestamp'  
  },{  
    Header: 'enviro data',  
    accessor: 'enviro data'  
    }
]}) 
console.log(this.state)


}



render() {

  const options1 = [
    'HA-8180', 'HA-8181'
  ];

  const options2 = ['1584614008812' , '1584614084785' , '1584614084785']

  const defaultOption1 = options1[0];
  const defaultOption2 = options2[0];

  let dropdown1 = <div>
  <Dropdown options={options1} onChange={(event => this.onChangeHandler1(event))} value={defaultOption1} placeholder="Select an option" />
  </div>

  let dropdown2 =  <div>
  <Dropdown options={options2} onChange={(event => this.onChangeHandler2(event))} value={defaultOption2} placeholder="Select an option" />
  </div>

  let table;
 
  if(this.state.data==null){
     table = <div></div> 
  }
  else
  {
    table = <div><ReactTable  
    data={this.state.data}  
    columns={this.state.columns}></ReactTable></div>
  }



  return(
    <div>
    {dropdown1}
    {dropdown2}
    <button className="Button"   value = "submit" onClick = {this.onSubmitHandler}>Submit</button>
    {table}
    </div>
    )
}
}

export default App;
