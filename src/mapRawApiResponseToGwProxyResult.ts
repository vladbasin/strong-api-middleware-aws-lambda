import { APIGatewayProxyResult } from 'aws-lambda';
import { RawLambdaApiResponseType, unwrapMaybeNullableRecord } from '.';

export const mapRawApiResponseToGwProxyResult = (response: RawLambdaApiResponseType): APIGatewayProxyResult => {
    const { statusCode, headers, multiValueHeaders, body, isBase64Encoded } = response;

    return {
        statusCode,
        headers: unwrapMaybeNullableRecord(headers, t => t),
        body: body ?? '',
        multiValueHeaders: unwrapMaybeNullableRecord(multiValueHeaders, t => t),
        isBase64Encoded: isBase64Encoded || false,
    };
};
