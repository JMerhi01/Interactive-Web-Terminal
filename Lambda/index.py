import json
import boto3
from datetime import datetime, timezone
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitorcount')
visitor_id = "mainPage"
cooldown_period = 30000  
def lambda_handler(event, context):
    try:
        response = table.get_item(Key={'id': visitor_id})
        item = response.get('Item', {})

        now = int(datetime.now(timezone.utc).timestamp() * 1000)  
        last_visit = item.get('lastVisit', 0)

        if now - last_visit < cooldown_period:
          
            return {
                'statusCode': 200,
                'body': json.dumps("Cooldown period active")
            }

        update_expression = "SET #count = if_not_exists(#count, :start) + :inc, #lastVisit = :now"
        expression_attribute_names = {'#count': 'count', '#lastVisit': 'lastVisit'}
        expression_attribute_values = {':inc': 1, ':start': 0, ':now': now}

        updated_item = table.update_item(
            Key={'id': visitor_id},
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expression_attribute_names,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="UPDATED_NEW"
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'count': updated_item['Attributes']['count']})
        }

    except ClientError as e:
        print(e.response['Error']['Message'])
        return {
            'statusCode': 500,
            'body': json.dumps("Internal Server Error")
        }
