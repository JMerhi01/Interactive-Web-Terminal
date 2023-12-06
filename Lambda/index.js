const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const tableName = "visitorcount";
    const visitorId = "mainPage";
    const cooldownPeriod = 60000; 

    const getResult = await dynamoDB.get({
        TableName: tableName,
        Key: { "id": visitorId }
    }).promise();

    const now = Date.now();
    const lastVisit = getResult.Item?.lastVisit || 0;

    if (now - lastVisit < cooldownPeriod) {
        return { statusCode: 200, body: "On cooldown" };
    }

    
    const updateParams = {
        TableName: tableName,
        Key: { "id": visitorId },
        UpdateExpression: "SET #count = if_not_exists(#count, :start) + :inc, #lastVisit = :now",
        ExpressionAttributeNames: {
            "#count": "count",
            "#lastVisit": "lastVisit"
        },
        ExpressionAttributeValues: {
            ":inc": 1,
            ":start": 0,
            ":now": now
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const updateResult = await dynamoDB.update(updateParams).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                count: updateResult.Attributes.count,
                lastUpdated: updateResult.Attributes.lastVisit 
            }),
            headers: { "Access-Control-Allow-Origin": "*" } 
        };
    } catch (error) {
        console.error("Error updating DynamoDB:", error);
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};
