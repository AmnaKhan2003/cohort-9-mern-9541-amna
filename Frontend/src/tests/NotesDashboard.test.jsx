/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import NotesDashboard from "../pages/NotesPages/NotesDashboard";
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

describe("NotesDashboard Page Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and display notes", async () => {

    axios.get.mockResolvedValue({
      data: {
        notes: [
          {
            _id: "1",
            title: "First Note",
            content: "First Content",
          },
          {
            _id: "2",
            title: "Second Note",
            content: "Second Content",
          },
        ],
      },
    });

    render(<NotesDashboard />);

    await waitFor(() => {
      expect(screen.getByText("First Note")).toBeTruthy();
      expect(screen.getByText("Second Note")).toBeTruthy();
    });

  });


  it("should show empty workspace when there are no notes", async () => {

    axios.get.mockResolvedValue({
      data: {
        notes: [],
      },
    });

    render(<NotesDashboard />);

    await waitFor(() => {
      expect(
        screen.getByText("Your workspace is empty")
      ).toBeTruthy();
    });

  });


  it("should navigate to add note page", async () => {

    axios.get.mockResolvedValue({
      data: {
        notes: [],
      },
    });

    render(<NotesDashboard />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Add Note/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/add-note");

  });


  it("should search notes", async () => {

    axios.get.mockResolvedValue({
      data: {
        notes: [
          {
            _id: "1",
            title: "React Notes",
            content: "Learning React",
          },
          {
            _id: "2",
            title: "Node Notes",
            content: "Learning Node",
          },
        ],
      },
    });

    render(<NotesDashboard />);

    await waitFor(() => {
      expect(screen.getByText("React Notes")).toBeTruthy();
    });

    const searchInput = screen.getByPlaceholderText("Search notes...");

    fireEvent.change(searchInput, {
      target: {
        value: "React",
      },
    });

    expect(screen.getByText("React Notes")).toBeTruthy();

    expect(screen.queryByText("Node Notes")).toBeNull();

  });


  it("should delete note successfully", async () => {

    axios.get.mockResolvedValue({
      data: {
        notes: [
          {
            _id: "1",
            title: "Test Note",
            content: "Test Content",
          },
        ],
      },
    });

    axios.delete.mockResolvedValue({
      data: {
        message: "Note deleted successfully",
      },
    });

    render(<NotesDashboard />);

    await waitFor(() => {
      expect(screen.getByText("Test Note")).toBeTruthy();
    });

    const deleteButton = screen.getByTitle("Delete note");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(
        screen.getByText("Your workspace is empty")
      ).toBeTruthy();
    });

  });


  it("should show error when deleting note fails", async () => {

    axios.get.mockResolvedValue({
      data: {
        notes: [
          {
            _id: "1",
            title: "Test Note",
            content: "Test Content",
          },
        ],
      },
    });

    axios.delete.mockRejectedValue({
      response: {
        data: {
          message: "Failed to delete note",
        },
      },
    });

    render(<NotesDashboard />);

    await waitFor(() => {
      expect(screen.getByText("Test Note")).toBeTruthy();
    });

    fireEvent.click(
      screen.getByTitle("Delete note")
    );

    const { toast } = await import("react-toastify");

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to delete note"
      );
    });

  });

});