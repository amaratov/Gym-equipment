const AWS = require('aws-sdk');
   const dynamodb = new AWS.DynamoDB.DocumentClient();
   const { v4: uuidv4 } = require('uuid');

   exports.handler = async (event) => {
     const { userId, name, type, status } = JSON.parse(event.body);
     const equipmentId = uuidv4();
     const lastUpdated = new Date().toISOString();

     const params = {
       TableName: 'GymEquipment',
       Item: {
         userId,
         equipmentId,
         name,
         type,
         status,
         lastUpdated,
       },
     };

     try {
       await dynamodb.put(params).promise();
       return {
         statusCode: 200,
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Content-Type',
           'Access-Control-Allow-Methods': 'OPTIONS,POST'
         },
         body: JSON.stringify(params.Item),
       };
     } catch (error) {
       console.error('Error creating equipment:', error);
       return {
         statusCode: 500,
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Content-Type',
           'Access-Control-Allow-Methods': 'OPTIONS,POST'
         },
         body: JSON.stringify({ error: 'Could not create equipment' }),
       };
     }
   };