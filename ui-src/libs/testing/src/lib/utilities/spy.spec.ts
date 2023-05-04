import { SpyObj } from "../types";

export const createSpyObj = <T extends object>(baseName: string, methodNames: Array<keyof T>): SpyObj<T> => {
  return {
    ...methodNames.reduce((spyObj, methodName) => {
      spyObj[methodName] = jest.fn();
      return spyObj;
    }, {} as { [key in keyof T]: jest.Mock<T[key]> }),
  }
}

describe('createSpyObj', () => {
  it('should create a spy object', () => {
    const spyObj = createSpyObj('Test', ['testMethod']);
    expect(spyObj.testMethod).toBeDefined();
  });
})
