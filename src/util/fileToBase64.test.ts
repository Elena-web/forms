import { fileToBase64 } from './fileToBase64';

describe('fileToBase64', () => {
  let originalFileReader: typeof FileReader;

  beforeEach(() => {
    originalFileReader = window.FileReader;
  });

  afterEach(() => {
    window.FileReader = originalFileReader;
    jest.restoreAllMocks();
  });

  it('should resolve with a base64 string when reading succeeds', async () => {
    const mockFile = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const mockResult = 'data:text/plain;base64,aGVsbG8=';

    class MockFileReader {
      result: string | null = null;
      onload: ((ev: ProgressEvent<FileReader>) => void) | null = null;
      onerror: ((ev: ProgressEvent<FileReader>) => void) | null = null;

      readAsDataURL() {
        this.result = mockResult;
        const event = new ProgressEvent('load') as ProgressEvent<FileReader>;
        this.onload?.(event);
      }
    }

    window.FileReader = MockFileReader as unknown as typeof FileReader;

    await expect(fileToBase64(mockFile)).resolves.toBe(mockResult);
  });

  it('should reject with an error when reading fails', async () => {
    const mockFile = new File(['oops'], 'oops.txt', { type: 'text/plain' });

    class MockFileReader {
      result: string | null = null;
      onload: ((ev: ProgressEvent<FileReader>) => void) | null = null;
      onerror: ((ev: ProgressEvent<FileReader>) => void) | null = null;

      readAsDataURL() {
        const errorEvent = new ProgressEvent(
          'error'
        ) as ProgressEvent<FileReader>;
        this.onerror?.(errorEvent);
      }
    }

    window.FileReader = MockFileReader as unknown as typeof FileReader;

    await expect(fileToBase64(mockFile)).rejects.toThrow();
  });
});
