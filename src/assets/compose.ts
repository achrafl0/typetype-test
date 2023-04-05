export type ComposableFunction<A = any, B = any> = (input: A) => Promise<B>;
export type ComposeFns<
  ToReduceFunctions extends Array<ComposableFunction>,
  PreviousResult extends Array<ComposableFunction> = []
> = ToReduceFunctions extends [
  ComposableFunction<infer FirstFunctionInput, infer FirstFunctionOutput>
]
  ? [
      ...PreviousResult,
      ComposableFunction<FirstFunctionInput, FirstFunctionOutput>
    ]
  : ToReduceFunctions extends [
      ComposableFunction<infer Input, any>,
      ...infer Rest
    ]
  ? Rest extends [ComposableFunction<infer Output, any>, ...any[]]
    ? ComposeFns<Rest, [...PreviousResult, ComposableFunction<Input, Output>]>
    : PreviousResult
  : PreviousResult;

export type ExtractComposeReturn<
  ComposableFunctions extends Array<ComposableFunction>
> = ComposableFunctions extends [
  ComposableFunction<infer FirstInput, infer FirstOutput>,
  ...infer Rest
]
  ? Rest extends [...any[], ComposableFunction<any, infer LastOutput>]
    ? ComposableFunction<FirstInput, Awaited<LastOutput>>
    : ComposableFunction<FirstInput, Awaited<FirstOutput>>
  : ComposableFunction<never, never>;

type AreComposable<ComposableFunctions extends Array<ComposableFunction>> =
  ComposeFns<ComposableFunctions> extends ComposableFunctions
    ? ComposableFunctions
    : ComposeFns<ComposableFunctions>;

export type Compose = <ComposableFunctions extends Array<ComposableFunction>>(
  ...fns: AreComposable<ComposableFunctions>
) => ExtractComposeReturn<ComposableFunctions>;
