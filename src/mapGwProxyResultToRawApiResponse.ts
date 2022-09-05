import { ApiResponsePayloadType } from '@vladbasin/strong-api-middleware';
import { isNil } from 'lodash';
import { APIGatewayProxyResult } from 'aws-lambda';
import { unwrapMaybeNullableRecord } from './unwrapMaybeNullableRecord';
import { RawLambdaApiResponseType } from './types';

export const mapGwProxyResultToRawApiResponse = (response: APIGatewayProxyResult): RawLambdaApiResponseType => {
    const { statusCode, headers, multiValueHeaders, body } = response;

    const parsedBody = JSON.parse(body || '') as ApiResponsePayloadType<unknown, unknown>;
    const targetBody =
        isNil(parsedBody?.data) && isNil(parsedBody?.error) ? undefined : parsedBody?.data || parsedBody?.error;

    return {
        statusCode,
        headers: unwrapMaybeNullableRecord(headers, t => String(t)),
        body: JSON.stringify(targetBody),
        multiValueHeaders: unwrapMaybeNullableRecord(multiValueHeaders, t => t.map(x => String(x))),
        isBase64Encoded: response.isBase64Encoded,
    };
};
