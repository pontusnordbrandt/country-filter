import { expect, test, vi } from 'vitest'
import { onlyLettersRegexp, getPreferredTheme } from "./utils";

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

test('regexp matching only letters', () => {
    // Valid
    expect(onlyLettersRegexp.test("EE")).toBeTruthy()
    expect(onlyLettersRegexp.test(" ")).toBeTruthy()
    expect(onlyLettersRegexp.test("ee")).toBeTruthy()
    expect(onlyLettersRegexp.test("ee")).toBeTruthy()

    // Invalid
    expect(onlyLettersRegexp.test("232")).toBeFalsy()
    expect(onlyLettersRegexp.test("2")).toBeFalsy()
    expect(onlyLettersRegexp.test("ee1")).toBeFalsy()
    expect(onlyLettersRegexp.test("åö")).toBeFalsy()
    expect(onlyLettersRegexp.test("ee#")).toBeFalsy()
})

test("getPreferredTheme should return correct theme from match media", () => {
    expect(getPreferredTheme()).toBe("light")
    
    // change matches to true
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: true,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
    });
    expect(getPreferredTheme()).toBe("dark")
})


test("getPreferredTheme should return correct theme from local storage", () => {
    localStorage.theme = "dark"
    expect(getPreferredTheme()).toBe("dark")
    localStorage.theme = "light"
    expect(getPreferredTheme()).toBe("light")
})