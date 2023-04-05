import {
  AreComposable,
  ComposableFunction,
  Compose,
  ExtractComposeReturn,
} from "./assets/compose";

export const composePromise: Compose = <
  ComposableFunctions extends Array<ComposableFunction>
>(
  ...fns: AreComposable<ComposableFunctions>
): ExtractComposeReturn<ComposableFunctions> => {
  return (fns as ComposableFunction<any, any>[]).reduce(
    (prevFn, nextFn) => async (args) => {
      const nextArg = await prevFn(args);

      const result = await nextFn(nextArg);

      return result;
    },
    (args) => args
  ) as ExtractComposeReturn<ComposableFunctions>;
};

type User = {
  id: number;
  name: string;
};

let fn1: (a: number) => Promise<string>;
let fn2: (b: string) => Promise<string[]>; // String ->
let fn3: (c: string[]) => Promise<number[]>;
let fn4: (d: number[]) => Promise<User[]>;

let b = composePromise(fn1, fn2, fn3, fn4)(32); // User[]
