/*
* Test for the argsParser.js
*
*/

// Dependencies
const path = require("path");
const args = require("./../argsParser");
const argsParser = args.argsParser;
const repoList = args.repoList;

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

test("Expect random flags to log/throw an error", () => {
  const spyError = jest.spyOn(console, "error");
  expect(() => argsParser(["-asldfasdf"])).toThrow();
  expect(spyError).toHaveBeenCalledTimes(1);
});

/////////////////////////////////////////////
// Test enterprise flag
/////////////////////////////////////////////

test("Expect enterprise flags to return true for input.enterprise", () => {
  expect(argsParser(["--enterprise"])).toMatchObject({ enterprise: true });
  expect(argsParser(["-e"])).toMatchObject({ enterprise: true });
});

/////////////////////////////////////////////
// Test verbose flag
/////////////////////////////////////////////

test("Expect verbose flags to return true for input.verbose", () => {
  expect(argsParser(["--verbose"])).toMatchObject({ verbose: true });
  expect(argsParser(["-V"])).toMatchObject({ verbose: true });
});

/////////////////////////////////////////////
// Test clone flag
/////////////////////////////////////////////

test("Expect clone flags to return url for input.clone", () => {
  expect(() => argsParser(["--clone", "-h"])).toThrow();
  expect(
    argsParser(["--clone", "https://github.com/davidicus/myboilerplate.git"])
  ).toMatchObject({ clone: "https://github.com/davidicus/myboilerplate.git" });
  expect(
    argsParser(["-c", "https://github.com/davidicus/myboilerplate.git"])
  ).toMatchObject({ clone: "https://github.com/davidicus/myboilerplate.git" });
});

/////////////////////////////////////////////
// Test remote flag
/////////////////////////////////////////////

test("Expect remote flags to return true for input.remote", () => {
  expect(argsParser(["--remote"])).toMatchObject({ remote: true });
  expect(argsParser(["-r"])).toMatchObject({ remote: true });
});

/////////////////////////////////////////////
// Test named repo from config -local test only
/////////////////////////////////////////////

// test("Expect arg name to be found and configs and set as value for input.clone", () => {
//   expect(argsParser(["react"])).toMatchObject({
//     clone: "https://github.com/davidicus/react-app-starter.git"
//   });
// });

/////////////////////////////////////////////
// Test default object
/////////////////////////////////////////////

test("Expect returned value to be an object that matches test obj", () => {
  // Configuration path
  const configPath = path.join(
    process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
    "/.kickconfig.json"
  );
  // Expected return object
  const expected = {
    configPath,
    clone: repoList.repos[Object.keys(repoList.repos)[0]],
    local: process.cwd(),
    remote: false,
    verbose: false,
    enterprise: false
  };
  expect(argsParser([])).toMatchObject(expected);
});
