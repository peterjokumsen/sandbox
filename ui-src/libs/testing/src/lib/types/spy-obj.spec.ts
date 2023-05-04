export type SpyObj<T extends object> = Partial<{ [K in keyof T]: jest.Mock<T[K]> }>;

describe('SpyObj', () => {
  it('should exist', () => {
    expect(true).toBeTruthy();
  });
});
