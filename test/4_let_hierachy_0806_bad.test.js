class GenericReport {
  constructor(params) {
    this.params = params;
  }
  printReport(params) {
    return Object.assign(this.params, params);
  }
}

test("GenericReport printReport method", () => {
  const report = new GenericReport({ whatever: "we want", to: "add" });
  const result = report.printReport({ extra: "params" });
  const expected = {
    whatever: "we want",
    to: "add",
    extra: "params",
  };
  expect(result).toEqual(expected);
});
