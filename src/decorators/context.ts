import { defineDecorator, ParserType } from '@vladbasin/strong-api-mapping';

export const context = (options: { key?: string; parser?: ParserType }): PropertyDecorator =>
    defineDecorator({
        source: 'context',
        useKey: true,
        isKeyCaseSensitive: false,
        key: options.key,
        parser: options.parser,
        isCustom: true,
    });
