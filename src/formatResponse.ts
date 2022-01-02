import { APIGatewayProxyResult } from 'aws-lambda';
import { RawApiResponseType } from '@vladbasin/strong-api-middleware';
import { unwrapMaybeNullableRecord } from '.';

export const formatResponse = (response: RawApiResponseType): APIGatewayProxyResult => {
    const { statusCode, headers, multiValueHeaders, body } = response;

    return {
        statusCode,
        headers: unwrapMaybeNullableRecord(headers),
        body: body ?? '',
        multiValueHeaders: unwrapMaybeNullableRecord(multiValueHeaders),
        isBase64Encoded: false,
    };
};
