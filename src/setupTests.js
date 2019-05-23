import 'jest-dom/extend-expect';

//This is required to silence a React DOM error that will be fixed in
//version 16.9.0. Once this is released, remove this code.
//Related GitHub issue https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
