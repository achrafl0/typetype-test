import { ComposableFunction, Compose } from "./assets/compose";

type User = {
  id: number;
  name: string;
};

let fn1: (id: string) => Promise<User>;
let fn2: (user: User) => Promise<{ nbOfShipments: number }>;
let fn3: ({ nbOfShipments }: { nbOfShipments: number }) => Promise<number[]>;
let fn4: ComposableFunction<number[], User[]>;

let compose: Compose; // Pas implementé, juste pour test les types

let b = compose(fn1, fn2, fn3, fn4)("aze"); // User[]
