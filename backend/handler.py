import json
import uuid
import boto3
import os

# Initialize DynamoDB resource and table using environment variable

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

# Define CORS headers for API Gateway responses
headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE"
}

# Lambda handler to fetch all notes from DynamoDB.
def get_notes(event, context):
    response = table.scan()
    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps(response['Items'])
    }

# Lambda handler to add a new note to DynamoDB.
def add_note(event, context):
    data = json.loads(event['body'])
    note = {
        "id": str(uuid.uuid4()),
        "content": data['content']
    }
    table.put_item(Item=note)
    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps(note)
    }

# Lambda handler to delete a note by ID from DynamoDB.
def delete_note(event, context):
    note_id = event['pathParameters']['id']
    table.delete_item(Key={"id": note_id})
    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"message": "Deleted"})
    }