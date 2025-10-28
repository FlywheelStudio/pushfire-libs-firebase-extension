
describe("pushfire-subscribers-sync", () => {
  it("should respond with the configured greeting", async () => {
    const expected = {
      message: "Hello World",
      timestamp: new Date().toISOString(),
      request: {
        method: "GET",
        url: "/",
        headers: {},
        body: {},
      },
    };
  }).timeout(10000);
});
