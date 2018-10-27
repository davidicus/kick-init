/*
* Test for the argsParser.js
*
*/

const argsParser = require("./../argsParser");

/////////////////////////////////////////////
// Test flags that just return a console.log
// -h, --help, -l --list, -v, --version
/////////////////////////////////////////////

test("Expect these flags to return null", () => {
  expect(argsParser(["-h"])).toEqual(null);
  expect(argsParser(["--help"])).toEqual(null);
  expect(argsParser(["-l"])).toEqual(null);
  expect(argsParser(["--list"])).toEqual(null);
  expect(argsParser(["-v"])).toEqual(null);
  expect(argsParser(["--version"])).toEqual(null);
});

test("Expect these flags to log to console", () => {
  const spyLog = jest.spyOn(console, "log");
  argsParser(["-h"]);
  argsParser(["--help"]);
  argsParser(["-l"]);
  argsParser(["--list"]);
  argsParser(["-v"]);
  argsParser(["--version"]);
  expect(spyLog).toHaveBeenCalledTimes(6);
});

/////////////////////////////////////////////
// Test random flag
/////////////////////////////////////////////

test("Expect random flags to log an error", () => {
  const spyError = jest.spyOn(console, "error");
  expect(() => argsParser(["-asldfasdf"])).toThrow();
  expect(spyError).toHaveBeenCalledTimes(1);
});
