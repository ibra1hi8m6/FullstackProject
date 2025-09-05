import { FirstKeyTsPipe } from './first-key.ts.pipe';

describe('FirstKeyTsPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstKeyTsPipe();
    expect(pipe).toBeTruthy();
  });
});
