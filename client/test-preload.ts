import { expect } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { disableRealRequests } from "bun-bagel";

// IMPORTANT: GlobalRegistrator.register() must run before any module that loads
// @testing-library/dom. jest-dom v7's matchers load it, so they must be imported
// dynamically after the global document has been installed.
GlobalRegistrator.register();

const { default: _default, ...matchers } = await import(
  "@testing-library/jest-dom/matchers"
);

disableRealRequests();
expect.extend(matchers);
