/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
} from "@jest/globals";
import EditNote from "../pages/NotesPages/EditNote";
import axios from "axios";

jest.mock("axios");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "123" }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock("../Components/Sidebar", () => () => <div>Sidebar</div>);

describe("EditNote Page Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and display note", async () => {
    axios.get.mockResolvedValue({
      data: {
        note: {
          title: "Old Title",
          content: "Old Content",
        },
      },
    });

    render(<EditNote />);

    try {
      await waitFor(() => {
        expect(
          screen.getByDisplayValue("Old Title"),
        ).toBeInTheDocument();

        expect(
          screen.getByDisplayValue("Old Content"),
        ).toBeInTheDocument();
      });
    } catch (error) {
      throw new Error(`Fetch note test failed: ${error.message}`);
    }
  });

  it("should show error when title or content is empty", async () => {
    axios.get.mockResolvedValue({
      data: {
        note: {
          title: "Old Title",
          content: "Old Content",
        },
      },
    });

    render(<EditNote />);

    try {
      await waitFor(() => {
        expect(
          screen.getByDisplayValue("Old Title"),
        ).toBeInTheDocument();
      });

      fireEvent.change(
        screen.getByDisplayValue("Old Title"),
        {
          target: {
            value: "",
            name: "title",
          },
        },
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: "Save Changes",
        }),
      );

      const { toast } = await import("react-toastify");

      expect(toast.error).toHaveBeenCalledWith(
        "Title and content are required",
      );
    } catch (error) {
      throw new Error(`Edit note validation test failed: ${error.message}`);
    }
  });

  it("should update note successfully", async () => {
    axios.get.mockResolvedValue({
      data: {
        note: {
          title: "Old Title",
          content: "Old Content",
        },
      },
    });

    axios.put.mockResolvedValue({
      data: {
        message: "Note updated successfully",
      },
    });

    render(<EditNote />);

    try {
      await waitFor(() => {
        expect(
          screen.getByDisplayValue("Old Title"),
        ).toBeInTheDocument();
      });

      fireEvent.change(
        screen.getByDisplayValue("Old Title"),
        {
          target: {
            value: "Updated Title",
            name: "title",
          },
        },
      );

      fireEvent.change(
        screen.getByDisplayValue("Old Content"),
        {
          target: {
            value: "Updated Content",
            name: "content",
          },
        },
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: "Save Changes",
        }),
      );

      await waitFor(() => {
        expect(axios.put).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
      });
    } catch (error) {
      throw new Error(`Update note success test failed: ${error.message}`);
    }
  });

  it("should show error when update fails", async () => {
    axios.get.mockResolvedValue({
      data: {
        note: {
          title: "Old Title",
          content: "Old Content",
        },
      },
    });

    axios.put.mockRejectedValue({
      response: {
        data: {
          message: "Failed to update note",
        },
      },
    });

    render(<EditNote />);

    try {
      await waitFor(() => {
        expect(
          screen.getByDisplayValue("Old Title"),
        ).toBeInTheDocument();
      });

      fireEvent.click(
        screen.getByRole("button", {
          name: "Save Changes",
        }),
      );

      const { toast } = await import("react-toastify");

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          "Failed to update note",
        );
      });
    } catch (error) {
      throw new Error(`Update note error test failed: ${error.message}`);
    }
  });
});