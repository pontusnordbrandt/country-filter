import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GetCountriesDocument } from "../graphql/__generated__/graphql";

import App from "./app";
import { GraphQLError } from "graphql/error/GraphQLError";
const mockCountries = [
  {
    request: {
      query: GetCountriesDocument,
      variables: {
        filter: "",
      },
    },
    result: {
      data: {
        countries: [
          {
            name: "United Arab Emirates",
            code: "UAE",
          },
          {
            name: "Estonia",
            code: "EE",
          },
        ],
      },
    },
  },
];

describe("App test", async () => {
  it("Should render loading indicator", async () => {
    render(
      <MockedProvider mocks={mockCountries}>
        <App />
      </MockedProvider>,
    );

    const loading = screen.queryByTestId("loading");
    expect(loading).toBeInTheDocument();
  });
  it("Should render the page correctly with a list of countries", async () => {
    render(
      <MockedProvider mocks={mockCountries}>
        <App />
      </MockedProvider>,
    );
    const uae = await screen.findByText("United Arab Emirates");
    expect(uae).toBeInTheDocument();
    const estonia = await screen.findByText("Estonia");
    expect(estonia).toBeInTheDocument();
  });

  it("should display error message and no countries if there is an error in user input", async () => {
    const ERROR_MESSAGE_STRING = "Country code can only consist of letters";
    render(
      <MockedProvider mocks={mockCountries}>
        <App />
      </MockedProvider>,
    );

    let errorMsg = screen.queryByText(ERROR_MESSAGE_STRING);
    expect(errorMsg).not.toBeInTheDocument();

    let uae = await screen.findByText("United Arab Emirates");
    expect(uae).toBeInTheDocument();
    let estonia = await screen.findByText("Estonia");
    expect(estonia).toBeInTheDocument();

    // Some
    let input = screen.getByTestId("country-code");
    fireEvent.change(input, { target: { value: "10" } });
    errorMsg = screen.queryByText(ERROR_MESSAGE_STRING);
    expect(errorMsg).toBeInTheDocument();

    input = screen.getByTestId("country-code");
    fireEvent.change(input, { target: { value: "EE!" } });
    errorMsg = screen.queryByText(ERROR_MESSAGE_STRING);
    expect(errorMsg).toBeInTheDocument();

    input = screen.getByTestId("country-code");
    fireEvent.change(input, { target: { value: "E.E" } });
    errorMsg = screen.queryByText(ERROR_MESSAGE_STRING);
    expect(errorMsg).toBeInTheDocument();

    input = screen.getByTestId("country-code");
    fireEvent.change(input, { target: { value: "1EE" } });
    errorMsg = screen.queryByText(ERROR_MESSAGE_STRING);
    expect(errorMsg).toBeInTheDocument();

    input = screen.getByTestId("country-code");
    fireEvent.change(input, { target: { value: "E" } });
    errorMsg = screen.queryByText(ERROR_MESSAGE_STRING);
    expect(errorMsg).not.toBeInTheDocument();
  });

  it("should display correct error message in case of network error", async () => {
    const errorCountries = [
      {
        request: {
          query: GetCountriesDocument,
          variables: {
            filter: "",
          },
        },
        error: new Error("Error when fetching countries"),
      },
    ];
    render(
      <MockedProvider mocks={errorCountries}>
        <App />
      </MockedProvider>,
    );
    const input = screen.getByTestId("country-code");
    fireEvent.change(input, { target: { value: "EE" } });

    const error = await screen.findByTestId("error");
    expect(error).toBeInTheDocument();
  });
  it("should display correct error message in case of graphql error", async () => {
    const errorCountries = [
      {
        request: {
          query: GetCountriesDocument,
          variables: {
            filter: "",
          },
        },
        errors: [new GraphQLError("GraphQL Error")],
      },
    ];
    render(
      <MockedProvider mocks={errorCountries}>
        <App />
      </MockedProvider>,
    );
    const input = screen.getByTestId("country-code");
    fireEvent.change(input, { target: { value: "EE" } });
    const error = await screen.findByTestId("error");
    expect(error).toBeInTheDocument();
  });

  it("should change theme when clicking dark mode button", () => {
    render(
      <MockedProvider mocks={mockCountries}>
        <App />
      </MockedProvider>,
    );

    fireEvent(
      screen.getByText("🌞"),
      new MouseEvent("click", {
        bubbles: true,
      }),
    );

    screen.getByText("🌔");
  });
});
