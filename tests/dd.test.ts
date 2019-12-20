import dd from '@nunomaduro/dd';
import { mockProcessExit, mockProcessStdout } from 'jest-mock-process';

describe('dd', () => {
  let mockStdout: ReturnType<typeof mockProcessStdout>;
  let mockExit: ReturnType<typeof mockProcessExit>;

  beforeEach(() => {
    mockStdout = mockProcessStdout();
    mockExit = mockProcessExit();
  });

  afterEach(() => {
    mockStdout.mockRestore();
    mockExit.mockRestore();
  });

  it('dumps the given variable', () => {
    dd(1);

    expect(mockStdout).toHaveBeenCalledTimes(1);
    expect(mockStdout.mock.calls[0][0]).toContain('tests/dd.test.ts:19:7 number');
  });

  it('dumps the given multiple variables', () => {
    dd('foo', 1);

    expect(mockStdout).toHaveBeenCalledTimes(2);

    expect(mockStdout.mock.calls[0][0]).toContain('tests/dd.test.ts:26:7 string');

    expect(mockStdout.mock.calls[1][0]).toContain('tests/dd.test.ts:26:7 number');
  });

  it('exits once exit', () => {
    expect(() => dd('foo', { foo: 'bar' }).exit()).toThrowError('Exit was called in dd function.');
  });
});
