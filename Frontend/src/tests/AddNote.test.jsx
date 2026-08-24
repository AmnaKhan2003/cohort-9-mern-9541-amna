/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import AddNote from "../pages/NotesPages/AddNote";
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

jest.mock("../Components/Sidebar", () => () => <div>Sidebar</div>);

describe("AddNote Page Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show error when title or content is empty", async () => {
    render(<AddNote />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Note",
      }),
    );

    try {
      const { toast } = await import("react-toastify");

      expect(toast.error).toHaveBeenCalledWith(
        "Title and content are required",
      );
    } catch (error) {
      throw new Error(`Empty note validation test failed: ${error.message}`);
    }
  });

  it("should create note successfully", async () => {
    axios.post.mockResolvedValue({
      data: {
        message: "Note created successfully",
      },
    });

    render(<AddNote />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter note title"),
      {
        target: {
          value: "My First Note",
          name: "title",
        },
      },
    );

    fireEvent.change(
      screen.getByPlaceholderText("Write your note..."),
      {
        target: {
          value: "This is my first note",
          name: "content",
        },
      },
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Note",
      }),
    );

    try {
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
      });
    } catch (error) {
      throw new Error(`Create note success test failed: ${error.message}`);
    }
  });

  it("should show error when creating note fails", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: "Failed to create note",
        },
      },
    });

    render(<AddNote />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter note title"),
      {
        target: {
          value: "My Note",
          name: "title",
        },
      },
    );

    fireEvent.change(
      screen.getByPlaceholderText("Write your note..."),
      {
        target: {
          value: "Some content",
          name: "content",
        },
      },
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Note",
      }),
    );

    try {
      const { toast } = await import("react-toastify");

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          "Failed to create note",
        );
      });
    } catch (error) {
      throw new Error(`Create note error test failed: ${error.message}`);
    }
  });

  it("should navigate to dashboard when cancel is clicked", () => {
    render(<AddNote />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cancel",
      }),
    );

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});