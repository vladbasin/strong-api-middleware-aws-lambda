import { Maybe, MaybeNullable } from '@vladbasin/ts-types';
import { isNil } from 'lodash';

export const unwrapMaybeNullableRecord = <TValue>(
    arg: MaybeNullable<Record<string, Maybe<TValue>>>
): Record<string, TValue> => {
    return isNil(arg)
        ? {}
        : Object.entries(arg).reduce<Record<string, TValue>>((accum, next) => {
              const key = next[0];
              const value = next[1];

              if (!isNil(value)) {
                  // eslint-disable-next-line no-param-reassign
                  accum[key] = value;
              }

              return accum;
          }, {});
};
