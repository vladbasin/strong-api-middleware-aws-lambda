import { RawApiResponseType } from '@vladbasin/strong-api-middleware';

export type RawLambdaApiResponseType = RawApiResponseType & { isBase64Encoded?: boolean };
