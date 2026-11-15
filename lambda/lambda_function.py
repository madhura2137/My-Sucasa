"""Summarize a property JSON uploaded under property/ and optionally notify SNS."""

import json
import os
from urllib.parse import unquote_plus

import boto3

s3 = boto3.client("s3")
sns = boto3.client("sns")
SNS_TOPIC_ARN = os.environ.get("SNS_TOPIC_ARN", "")


def lambda_handler(event, context):
    results = []
    for record in event["Records"]:
        bucket = record["s3"]["bucket"]["name"]
        key = unquote_plus(record["s3"]["object"]["key"])
        if not key.startswith("property/") or not key.endswith(".json"):
            print(f"Ignoring object outside property/: {key}")
            continue

        listing = json.loads(s3.get_object(Bucket=bucket, Key=key)["Body"].read())
        summary = {
            "property_id": listing["property_id"],
            "title": listing.get("title", "Untitled property"),
            "location": listing.get("location", "Unspecified"),
            "property_type": listing.get("property_type", "Unspecified"),
            "bedrooms": listing.get("bedrooms"),
            "price_inr": listing.get("price_inr"),
            "source_file": key,
            "processed_by": context.function_name if context else "local-test",
        }
        out_key = f"processed/{listing['property_id']}_summary.json"
        s3.put_object(Bucket=bucket, Key=out_key, Body=json.dumps(summary, indent=2),
                      ContentType="application/json")
        if SNS_TOPIC_ARN:
            sns.publish(
                TopicArn=SNS_TOPIC_ARN,
                Subject=f"MySuCasa property listing: {summary['property_id']}",
                Message=(f"A property record was processed.\n{summary['title']}\n"
                         f"Location: {summary['location']}\n"
                         f"Price (INR): {summary['price_inr']}\n"
                         f"Summary: s3://{bucket}/{out_key}"),
            )
        results.append(summary)
    return {"statusCode": 200, "body": json.dumps(results)}
