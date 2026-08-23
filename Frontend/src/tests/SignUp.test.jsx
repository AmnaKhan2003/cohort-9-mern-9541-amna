/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
} from "@jest/globals";
import SignUp from "../pages/AuthPages/SignUp";
import axios from "axios";

jest.mock("axios");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("SignUp Page Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show error when fields are empty", async () => {
    render(<SignUp />);

    const signupButton = screen.getByRole("button", {
      name: "Sign Up",
    });

    fireEvent.click(signupButton);

    try {
      const { toast } = await import("react-toastify");

      expect(toast.error).toHaveBeenCalledWith(
        "Please fill all the fields",
      );
    } catch (error) {
      throw new Error(`Empty signup validation test failed: ${error.message}`);
    }
  });

  it("should show error when password is less than 6 characters", async () => {
    render(<SignUp />);

    fireEvent.change(
      screen.getByPlaceholderText("Full Name"),
      {
        target: {
          value: "Test User",
          name: "name",
        },
      },
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email Address"),
      {
        target: {
          value: "test@gmail.com",
          name: "email",
        },
      },
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "123",
          name: "password",
        },
      },
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Sign Up",
      }),
    );

    try {
      const { toast } = await import("react-toastify");

      expect(toast.error).toHaveBeenCalledWith(
        "Password must be at least 6 characters",
      );
    } catch (error) {
      throw new Error(
        `Password validation test failed: ${error.message}`,
      );
    }
  });

  it("should signup successfully", async () => {
    axios.post.mockResolvedValue({
      data: {
        message: "Signup successful",
      },
    });

    render(<SignUp />);

    fireEvent.change(
      screen.getByPlaceholderText("Full Name"),
      {
        target: {
          value: "Test User",
          name: "name",
        },
      },
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email Address"),
      {
        target: {
          value: "test@gmail.com",
          name: "email",
        },
      },
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "123456",
          name: "password",
        },
      },
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Sign Up",
      }),
    );

    try {
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          "http://localhost:5000/api/auth/signup",
          {
            name: "Test User",
            email: "test@gmail.com",
            password: "123456",
          },
        );

        expect(mockNavigate).toHaveBeenCalledWith("/login");
      });
    } catch (error) {
      throw new Error(`Signup success test failed: ${error.message}`);
    }
  });

  it("should show error when signup fails", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: "Email already exists",
        },
      },
    });

    render(<SignUp />);

    fireEvent.change(
      screen.getByPlaceholderText("Full Name"),
      {
        target: {
          value: "Test User",
          name: "name",
        },
      },
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email Address"),
      {
        target: {
          value: "existing@gmail.com",
          name: "email",
        },
      },
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "123456",
          name: "password",
        },
      },
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Sign Up",
      }),
    );

    try {
      const { toast } = await import("react-toastify");

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          "Email already exists",
        );
      });
    } catch (error) {
      throw new Error(`Signup failure test failed: ${error.message}`);
    }
  });
});