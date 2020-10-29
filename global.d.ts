/// <reference types="chai"/>

declare module NodeJS  {
  interface Global {
    expect: Chai.ExpectStatic;
  }
}
