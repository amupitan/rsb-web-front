import Yoda from './';

//TODO: remove this stub test when Yoda is completed. 
// It is here because a test file requires at least one test
test('errors are returned', () => {
    let error = { code: 400 };
    expect(Yoda.handleHTTPError(error)).toBe(error);
});