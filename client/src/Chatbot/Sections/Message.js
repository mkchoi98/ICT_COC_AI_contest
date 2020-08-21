import React from 'react'
import Info from '../Sections/Info'
import Card from '../Sections/Card'
import { List, Icon, Avatar } from 'antd';

function Message(props) {

    var descrip
    //const Image=<img src='C:/Users/kosta/Downloads/chatbot-app-master/chatbot-app-master/client/src/Chatbot/Sections/chatbotImage.png'/>
    //width='10' height='10'
    const AvatarSrc = props.who ==='구해줘 띵즈' ? <Icon type="robot" /> : <Icon type="smile" />  

        if(props.who ==='구해줘 띵즈'){

            var str=props.text.toString()

            //check information
            if(str.indexOf(' ]에 [ ') !== -1){

                str='[ '.concat(str.substring(7,9),'월 ',str.substring(10,12),'일',str.substring(12))

                if(str.indexOf('(') !== -1){
                    var start_1=str.indexOf('[', 12)
                    var end_1=str.indexOf(']', 15)

                    var start_2=str.indexOf('(')
                    var end_2=str.indexOf(')')

                    str=str.replace(str.substring(start_1 + 2, end_1 - 1), str.substring(start_2+1,end_2))
                }
                descrip=<div style={{backgroundColor: 'rgba(0,128,128,0.4)', padding : '5px 10px' , borderRadius: '0px 0px 5px 5px'}}>{str}</div>
            }
            else if(str.indexOf('things') !== -1){

                str=Info(str)
                // descrip=<div style={{backgroundColor: 'rgba(0,128,128,0.4)', padding : '5px 10px' , borderRadius: '0px 0px 5px 5px'}}><p>{str[0]}</p><p>{str[1]}</p><p>{str[2]}</p><p>{str[3]}</p></div>
                descrip=<div style={{backgroundColor: 'rgba(0,128,128,0.4)', padding : '5px 5px 5px 5px ' , borderRadius: '0px 0px 5px 5px'}}>{str[0]}<br></br><div style={{backgroundColor: 'rgba(0,163,153,0.5)',padding : '5px 10px', borderRadius: '0px 0px 5px 5px'}}>{str[2]}<br></br>{str[3]}<br></br>{str[4]}</div></div>
            }
            else if(str.indexOf('회사정보') !== -1){

                str=Card(str)
                descrip=<div style={{backgroundColor: 'rgba(0,128,128,0.4)', padding : '5px 10px' , borderRadius: '0px 0px 5px 5px'}}>{str}</div>
            }

            else{
                descrip=<div style={{backgroundColor: 'rgba(0,128,128,0.4)', padding : '5px 10px' , borderRadius: '0px 0px 5px 5px'}}>{str}</div>
            }
            
            return <div>
                <List.Item style={{ padding: '0.5rem' }}>
                    <List.Item.Meta 
                        avatar={<Avatar icon={AvatarSrc} />}
                        ///avatar={Image}
                        title = {props.who}
                        description={descrip}
                    />
                </List.Item>
            </div>
        }

        else{

            return <div>
                <List.Item style={{ padding: '0.5rem'}}>
                    <List.Item.Meta 
                        avatar={<Avatar icon={AvatarSrc}/>}
                        title = {props.who}
                        description={<div style={{backgroundColor: 'rgba(184,134,11,0.4)', padding : '5px 10px' , borderRadius: '0px 0px 5px 5px'}}> {props.text}</div>}
                    />
                </List.Item>
            </div>
        }
}

export default Message