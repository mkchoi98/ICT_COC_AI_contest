import React from 'react'
import Info from '../Sections/Info'
import Card from '../Sections/Card'
import { List, Avatar } from 'antd';

function Message(props) {

    var descrip
    const Image_bot=<img src='https://user-images.githubusercontent.com/59993071/90844507-0320ae00-e39f-11ea-9b58-1382a0949acd.png' alt='profile'/>
    const Image_user=<img src='https://user-images.githubusercontent.com/59993071/90857536-4f7be600-e3bf-11ea-8ac8-5c0ddd226b26.png' alt='profile'/> 

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
                        avatar={<Avatar icon={Image_bot} style={{margin: '8px 0px 0px 5px', width: '35px', height: '35px'}}/>}
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
                        avatar={<Avatar icon={Image_user} style={{margin: '8px 0px 0px 5px', width: '35px', height: '35px'}}/>}
                        title = {props.who}
                        description={<div style={{backgroundColor: 'rgba(184,134,11,0.4)', padding : '5px 10px' , borderRadius: '0px 0px 5px 5px'}}> {props.text}</div>}
                    />
                </List.Item>
            </div>
        }
}

export default Message