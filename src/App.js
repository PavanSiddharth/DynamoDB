import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import csvDownload from 'json-to-csv-export'

import Table from 'react-bootstrap/Table'
 

class App extends Component{

   constructor(props) {
    super(props);
    this.state = {
      device_id : null,
      timestamp : null,
      data1 : null,
      options1 : [],
      options2 : []
    };
  }

  componentDidMount = async() => {
    await fetch('https://e01jb75ql8.execute-api.us-east-2.amazonaws.com/Test?device_id='+this.state.device_id+'&timestamp='+this.state.timestamp,{method: 'GET',headers: {
      "x-api-key": "GWxQN3E0pw67TtTnRY2KQ5EFYBNZeday27p3raxr",
    }}) .then((response) => {
      
      return response.json();
  },function(err){
    console.log(err);
  }).then((data) =>{
    console.log(data); 
    const temp_data = JSON.parse(data.body).done.Items
    const data1 = []
    let i
    for(i in temp_data)
    {
      console.log(temp_data[i])
      data1.push(temp_data[i]) 
    }
    console.log(data1)
    this.setState({data1:data1})
    console.log(this.state);
    if(data1!=null)
    {
      let i
      for(i in data1)
      {
      let options1 = this.state.options1
      let options2 = this.state.options2
      options1.push(data1[i].Device_ID)
      options2.push(data1[i].timestamp)
       this.setState({options1:options1})
       this.setState({options2:options2})
      
      }
    }
    if(this.state.options1.length>0)
    {
      console.log(this.state)
    }

    
  });

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

 onSubmitHandler = () => {



};

DeviceIdClickHandler = (event) => {
  event.preventDefault();
      console.log(event.target.value)
      let i = event.target.value
      let device_id = this.state.data1[i].Device_ID
      let timestamp = this.state.data1[i].timestamp
      let enviro_data = this.state.data1[i]["enviro data"].Result
      csvDownload(enviro_data)
      
};



render() {



  let dropdown1 = <div>
  <Dropdown options={this.state.options1} onChange={(event => this.onChangeHandler1(event))}  placeholder="Select an option" />
  </div>

  let dropdown2 =  <div>
  <Dropdown options={this.state.options2} onChange={(event => this.onChangeHandler2(event))} placeholder="Select an option" />
  </div>

  let table;
  let buffer =[]
  if(this.state.data1==null){
     
     buffer.push(<div></div>) 
  }
  else
  {
    let i
 
    for(i in this.state.data1)
    {
    table = <tr>
    <td><button type="button" className="Button" value={i} onClick={(event => this.DeviceIdClickHandler(event))}> {this.state.data1[i].Device_ID} </button>
    </td>
    <td>{this.state.data1[i].timestamp}</td>
    <td>{this.state.data1[i]["enviro data"].Result}</td>
  </tr>
  buffer.push(table)
    }
    
  }


  return(
    <div>
    {dropdown1}
    {dropdown2}
    <button className="Button"   value = "submit" onClick = {this.onSubmitHandler}>Submit</button>
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Device_ID</th>
      <th>timestamp</th>
      <th>enviro_data</th>
    </tr>
  </thead>
  <tbody>

  {buffer}

  </tbody>
</Table>
    </div>
    )
}
}

export default App;
