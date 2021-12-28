import { APIGatewayProxyResult } from 'aws-lambda';
import { StrongApiResponseType } from '@vladbasin/strong-api-middleware';
import { unwrapMaybeNullableRecord } from '.';

export const formatResponse = (response: StrongApiResponseType): APIGatewayProxyResult => {
    const { statusCode, headers, multiValueHeaders, body } = response.raw;

    return {
        statusCode,
        headers: unwrapMaybeNullableRecord(headers),
        body: body ?? '',
        multiValueHeaders: unwrapMaybeNullableRecord(multiValueHeaders),
        isBase64Encoded: false,
    };
};
