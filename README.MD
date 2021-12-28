# Strong API middleware for AWS Lambda

Strongly typed API middleware for writing AWS Lambda functions

## Installation

### npm

`npm install @vladbasin/strong-api-middleware-aws-lambda @vladbasin/strong-api-mapping @vladbasin/ts-result aws-lambda reflect-metadata joi`

### yarn

`yarn add @vladbasin/strong-api-middleware-aws-lambda @vladbasin/ts-result @vladbasin/strong-api-mapping aws-lambda reflect-metadata joi`

## Usage

1. Import `reflect-metadata` ONCE in your index file:

```typescript
import 'reflect-metadata';
```

2. Define Request model

```typescript
import { body, header, path, query } from '@vladbasin/strong-api-mapping';

export class RequestPayload {
    @path()
    public userId!: number;

    @path({ key: 'userId' })
    public id!: number;

    @query()
    public name!: string;

    @query()
    public isAdmin!: boolean;

    @query({ key: 'lastname' })
    public surname!: string;

    @query({ parser: String })
    public cars!: string[];

    @query({ parser: Number })
    public cash!: number[];

    @body()
    public details!: DetailsType;

    @header({ key: 'Content-Type' })
    public contentType!: string;

    @header({ key: 'X-Info', parser: String })
    public info!: string[];
}
```

3. Define Response model

```typescript
import { body } from '@vladbasin/strong-api-mapping';

export class ResponsePayload {
    @body()
    public user!: UserType;
}
```

4. Define validation rules with `Joi`

```typescript
export const RequestPayloadSchema = Joi.object<RequestPayload>({
    surname: Joi.string().min(10),
    cars: Joi.array().max(3),
    // other rules for field content...
});
```

5. Create AWS Lambda using `IFunction` interface

```typescript
import { IFunction } from '@vladbasin/strong-api-middleware-aws-lambda';
import { assign } from 'lodash';

class MyFunction implements IFunction<RequestPayload, ResponseDataPayload> {
    public executeAsync(request: ApiRequestType<RequestPayload>) {
        // handle request and return Result<ApiResponseType>

        return Result
            .FromPromise(loadUserInformationAsync(request.userId)))
            .onSuccess(user => ({
                statusCode: HttpStatusCodes.Ok,
                payload: {
                    data: assign(new ResponsePayload(), { user }),
                },
            }));
    }
}
```

5. Call `handleStrongApiLambdaRequest()` when you want to process AWS Lambda function

```typescript
handleStrongApiLambdaRequest({
    // pass function to execute
    function: new MyFunction(),
    // configure request handling
    request: {
        // define request payload model which will be automapped
        payload: {
            Model: RequestPayload,
            schema: RequestPayloadSchema,
        }
    },
    // configure response handling
    response: {
        // process request handling error
        processFailure: {
            options: {
                // output possibly sensitive information (useful for debugging)
                allowSensitive: true,
            },
            // OPTIONAL
            responseCreator: (error, options, defaultResponseCreator) => { 
                // create ApiResponseType<TSuccessModel, TErrorModel> when error happens (by default done by this library automatically)
            },
        },
    },
});
```

This method returns `(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>` that is AWS Lambda.

In addition, you can share request/response models with your API consumers, so they don't need to repeat the same mapping & validation logic. See: [@vladbasin/strong-api-client](https://github.com/vladbasin/strong-api-client)