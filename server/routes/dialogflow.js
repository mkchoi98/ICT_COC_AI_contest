const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const app = express();

const config = require('../config/keys');

const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode

// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

//
 
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'aksrud99',
  database : 'chatbot'
});

var date;
var thing;
var cate;

// We will make two routes 
router.post('/textQuery', async (req,res) => {
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.text,
        languageCode: languageCode,
      },
    },
  };
 
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  
  console.log(`  Query: ${result.queryText}`);

  var str=result.fulfillmentText.toString();

  //check information
  if(str.indexOf('[ ') != -1){
    
    d_start=str.indexOf('[')
    
    c_start = str.indexOf('[', 15)
    c_end = str.indexOf('(')

    t_start=str.indexOf('(')
    t_end=str.indexOf(')')
    
    date = str.substring(d_start+2, d_start+12).replace(/-/g, "")

    if(date.substring(0,4)=='2021'){
        date = '2020'.concat(date.substring(4))
    }

    thing=str.substring(t_start+1, t_end)
    cate = str.substring( c_start+2, c_end)
    
    console.log(``);
    console.log(`date(날짜): ${date}`);
    console.log(`thing(물건): ${thing}`);
    console.log(`cate(분류): ${cate}`)
    console.log(``);

    console.log(`  Response: ${result.fulfillmentText}`);
    res.send(result)
  }

  //compare to database
  else if(str.indexOf('걱정')!= -1 || str.indexOf('info')!= -1 || str.indexOf('card')!= -1){
    connection.query(`SELECT * from things WHERE get_date = ${date*1} AND cate = '${cate}' AND (get_name like '%${thing}%' OR get_name like '%${cate}%')`, (error, rows, fields) => {
        
        if (error) throw error;

        result.fulfillmentText

        // console.log({rows}['rows'])

        if({rows}['rows'][0]==null){
          info='안타깝게도 접수된 분실물이 없습니다.'

          console.log(`  Response: ${result.fulfillmentText}`);
          result.fulfillmentMessages[1].text.text=info

          console.log(result.fulfillmentMessages[1].text.text);
        
          result.fulfillmentMessages[2].text.text='또 잃어버리신 물건은 없으신가요?'
          console.log(result.fulfillmentMessages[2].text.text)
        }
        else{
          id={rows}['rows'][0].id
          take_place={rows}['rows'][0].take_place
          get_date={rows}['rows'][0].get_date
          get_name={rows}['rows'][0].get_name
          get_area={rows}['rows'][0].get_area
          get_position={rows}['rows'][0].get_position

          info='things,'+id.toString()+','+take_place+','+get_date+','+get_name+','+get_area+','+get_position

          console.log(`  Response: ${result.fulfillmentText}`);
          result.fulfillmentMessages[1].text.text=info

          console.log(result.fulfillmentMessages[1].text.text);
        
          result.fulfillmentMessages[2].text.text='회사정보 : '+get_position
          console.log(result.fulfillmentMessages[2].text.text)
        }

        res.send(result)

  });

}

  else{
    console.log(`  Response: ${result.fulfillmentText}`);
    console.log(result)
    res.send(result)
  }
})

//Event Query Route
router.post('/eventQuery', async (req, res) => {

    // need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    
    res.send(result)
})

module.exports = router;