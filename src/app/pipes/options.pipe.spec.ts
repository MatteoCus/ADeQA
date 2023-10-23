import { OptionsPipe } from './options.pipe';

describe('OptionsPipe', () => {
  let pipe: OptionsPipe;

  beforeEach(() => {
    pipe = new OptionsPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the option by removing the key and hyphens', () => {
    const transformedOption = pipe.transform('key-value-option', 'key');
    expect(transformedOption).toBe('valueoption');
  });

  it('should trim the transformed option', () => {
    const transformedOption = pipe.transform('key-value-option', 'key');
    expect(transformedOption).toBe('valueoption');
  });

  it('should handle empty input', () => {
    const transformedOption = pipe.transform('', 'key');
    expect(transformedOption).toBe('');
  });
});
