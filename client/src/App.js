import React from "react";
import { Typography, Icon } from 'antd';
import Chatbot from './Chatbot/Chatbot';
const { Title } = Typography;

function App() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem'}}>
        <Title level={4} >구해줘 띵즈&nbsp;<Icon type="robot" /></Title>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
       
        <Chatbot/>


      </div>
    </div>
  )
}

export default App