import * as assert from "assert";
import * as sinon from "sinon";
import * as vscode from "vscode";
import { initialConverting } from "../cssParser";
import { activate } from "../extension";

suite("Extension Test Suite", () => {
  let showInformationMessageStub: sinon.SinonStub;

  setup(() => {
    showInformationMessageStub = sinon.stub(
      vscode.window,
      "showInformationMessage"
    );
  });

  teardown(() => {
    showInformationMessageStub.restore();
  });

  test("Initial converting function test", () => {
    const cssCode = "color: red;";
    const normalizedCssCode = cssCode.trim().replace(/\s+/g, " ");
    const expectedTailwindCode = "@apply text-[#ff0000];";
    const result = initialConverting(normalizedCssCode);
    assert.equal(result, expectedTailwindCode);
  });

  test("Multiple styles conversion test", () => {
    const cssCode = `
			color: red;
			background-color: blue;
			`;
    const normalizedCssCode = cssCode.trim().replace(/\s+/g, " ");
    const expectedTailwindCode = "@apply text-[#ff0000] bg-[#0000ff];";
    const result = initialConverting(normalizedCssCode);
    assert.equal(result, expectedTailwindCode);
  });

  test("Activate function test", () => {
    const context = {
      subscriptions: [],
    } as unknown as vscode.ExtensionContext;

    activate(context);
    assert.equal(context.subscriptions.length > 0, true);
  });
});
