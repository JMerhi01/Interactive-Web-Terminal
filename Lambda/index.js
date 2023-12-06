const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const tableName = "visitorcount";
    const data = JSON.parse(event.body);
    const uniqueVisitorId = data.visitorId;

    const getParams = {
        TableName: tableName,
        Key: { "id": uniqueVisitorId }
    };

    const getResult = await dynamoDB.get(getParams).promise();
    if (getResult.Item) {
        return { statusCode: 200, body: "Visitor already counted" };
    }

    const updateParams = {
        TableName: tableName,
        Key: { "id": "mainPage" },
        UpdateExpression: "SET #count = if_not_exists(#count, :start) + :inc",
        ExpressionAttributeNames: { "#count": "count" },
        ExpressionAttributeValues: { ":inc": 1, ":start": 0 },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const updateResult = await dynamoDB.update(updateParams).promise();
        await dynamoDB.put({
            TableName: tableName,
            Item: { "id": uniqueVisitorId }
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ count: updateResult.Attributes.count }),
            headers: { "Access-Control-Allow-Origin": "*" }
        };
    } catch (error) {
        console.error("Error updating DynamoDB:", error);
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};
