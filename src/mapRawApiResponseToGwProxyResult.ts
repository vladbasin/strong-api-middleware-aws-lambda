import { APIGatewayProxyResult } from 'aws-lambda';
import { RawApiResponseType } from '@vladbasin/strong-api-middleware';
import { unwrapMaybeNullableRecord } from '.';

export const mapRawApiResponseToGwProxyResult = (response: RawApiResponseType): APIGatewayProxyResult => {
    const { statusCode, headers, multiValueHeaders, body } = response;

    return {
        statusCode,
        headers: unwrapMaybeNullableRecord(headers, t => t),
        body: body ?? '',
        multiValueHeaders: unwrapMaybeNullableRecord(multiValueHeaders, t => t),
        isBase64Encoded: false,
    };
};
