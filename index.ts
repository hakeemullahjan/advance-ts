//https://kevinkreuzer.medium.com/advanced-typescript-43331bb4a875

//Intersection Type
interface Person {
  name: string;
  age: number;
}

interface FootballPlayer {
  club: string;
}

function transferPlayer(player: Person & FootballPlayer) {}

transferPlayer({ name: "Messi", age: 34, club: "PSG" });

//Keyof
type PersonProps = keyof Person;

interface TokenInfo {
  name: string;
  symbol: string;
  price: string;
}

const tokenInfo: TokenInfo = {
  name: "eth",
  symbol: "ETH",
  price: "1200",
};

const updateTokenInfo = (
  tokenInfo: TokenInfo,
  tokenEntry: keyof TokenInfo,
  change: string
) => {
  tokenInfo[tokenEntry] = change;
};

console.log(tokenInfo);
updateTokenInfo(tokenInfo, "symbol", "DAI");
updateTokenInfo(tokenInfo, "name", "dai-token");
console.log(tokenInfo);

//typeof
let firstName = "Hakeemullah";
let name2: typeof firstName = "hj";

const getAcccountInfo = () => {
  return { name: "account1", privateKey: "abc", tokenInfo: tokenInfo };
};

type Account = ReturnType<typeof getAcccountInfo>;

//Conditional Types
interface NumberId {
  id: number;
}

interface StringId {
  id: string;
}

type Id<T> = T extends string ? StringId : NumberId;

let idOne: Id<string> = {
  id: "232",
};

let idTwo: Id<number> = {
  id: 343,
};

//Utility Types
//Partial
interface Ticket {
  time?: string;
  name: string;
  movie: string;
}

function registerTicker(ticket: Partial<Ticket>) {}

registerTicker({ movie: "the last of us" });

//Required
function entryTicket(ticket: Required<Ticket>) {}

entryTicket({ name: "roy", movie: "ironman", time: "morning" });

//Extract
type MovieChar =
  | "Villian"
  | "Hero"
  | { name: string; age: number }
  | 12
  | { count: number };

type hpMovieChar = Extract<MovieChar, { name }>;

//Exclude
type hpMovieChar2 = Exclude<MovieChar, { count }>;

//Infer type
type flattenArrayType<T> = T extends Array<infer ArrayType> ? ArrayType : T;

type foo = flattenArrayType<string[]>;

type bar = flattenArrayType<number[]>;

type baz = flattenArrayType<string | number>;

//Mapped Type
interface Character {
  playAction: () => void;
  playFantasy: () => void;
}

type toFlags<Type> = { [Property in keyof Type]: boolean };

type CharFeatures = toFlags<Character>;

//
type mutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
}; //remove readonly from type

type MyChar = {
  readonly name: string;
  readonly age: number;
};

type mutableChar = mutable<MyChar>;

//
type optional<Type> = {
  [Property in keyof Type]+?: Type[Property];
}; //make properties optional

type MyChar2 = {
  name: string;
  age: number;
};

type optionalChar = optional<MyChar2>;

//
type optionalAndMutable<Type> = {
  -readonly [Property in keyof Type]+?: Type[Property];
};

type mutableAndMutableChar = optionalAndMutable<MyChar>;

//
type Setter<T> = {
  [Property in keyof T as `set${Capitalize<
    string & Property
  >}`]: () => T[Property];
};

type SpeacialChar = {
  firstName: string;
  userId: string;
  age: number;
};

type MyChar3 = Setter<SpeacialChar>;

//
type nameOnly<T> = {
  [Property in keyof T as Exclude<Property, "firstName">]: T[Property];
};

type MyChar4 = nameOnly<SpeacialChar>;
