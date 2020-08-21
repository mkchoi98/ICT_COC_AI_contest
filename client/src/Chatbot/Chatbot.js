import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import Message from './Sections/Message';
import { List, Icon, Avatar } from 'antd';
import Card from "./Sections/Card";

function Chatbot(props) {

    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)

    useEffect(() => {

        eventQuery('welcomeToMyWebsite')

    }, [])


    const textQuery = async (text) => {

        //  First  Need to  take care of the message I sent     
        let conversation = {
            who: '나',
            content: {
                text: {
                    text: text
                }
            }
        }

        dispatch(saveMessage(conversation))
        // console.log('text I sent', conversation)

        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    who: '구해줘 띵즈',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            conversation = {
                who: '구해줘 띵즈',
                content: {
                    text: {
                        text: " Error 방금 오류가 발생했습니다, 문제를 확인하십시오."
                    }
                }
            }

            dispatch(saveMessage(conversation))

        }

    }


    const eventQuery = async (event) => {

        // We need to take care of the message Chatbot sent 
        const eventQueryVariables = {
            event
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: '구해줘 띵즈',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            let conversation = {
                who: '구해줘 띵즈',
                content: {
                    text: {
                        text: "Error 방금 오류가 발생했습니다, 문제를 확인하십시오."
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }

    }


    const keyPressHandler = (e) => {
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('you need to type somthing first')
            }

            //we will send request to text query route 
            textQuery(e.target.value)


            e.target.value = "";
        }
    }

    const renderCards = (cards) => {
        return cards.map((card,i) => <Card key={i} cardInfo={card.structValue} />)
    }


    const renderOneMessage = (message, i) => {
        console.log('message', message)

        // we need to give some condition here to separate message kinds 

        // template for normal text 
        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />
        } 
        
        // template for card message 
        else if (message.content && message.content.payload.fields.card) {

            const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />

            if(message.who ==='bot'){
                return <div class="bot">
                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta 
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderCards(message.content.payload.fields.card.listValue.values)}

                    />
                </List.Item>
            </div>
            }
            else{
                return <div class="user">
                    <List.Item style={{ padding: '1rem' }}>
                        <List.Item.Meta 
                            avatar={<Avatar icon={AvatarSrc} />}
                            title={message.who}
                            description={renderCards(message.content.payload.fields.card.listValue.values)}                           
                        />
                    </List.Item>
                </div>
            }
        }

    }

    const renderMessages = (returnedMessages) => {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }

    const messageEndRef = useRef(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
        }
    });


    return (
        <div style={{  height: 620, width: 344, borderRadius: '7px'}}>
            <div style={{ height: 590, width: '100%', overflow: 'auto' , backgroundColor: 'rgba(0,0,0,0.1)'}}>
                
                {renderMessages(messagesFromRedux)}

                <div ref={messageEndRef} />
            </div>

            <input style={{
                    margin: 0, width: '100%', height: 50, border: '0px',
                    borderRadius: '2px', padding: '5px', fontSize: '1rem', backgroundColor: 'rgba(0,0,0,0.05)'
                }}
                placeholder="메세지를 입력하세요 ..."
                onKeyPress={keyPressHandler}
                type="text" />

        </div>

    )
}

export default Chatbot;