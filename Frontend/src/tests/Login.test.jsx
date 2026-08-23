/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react"; 
import { describe, it, expect, jest } from "@jest/globals"; 
import Login from "../pages/AuthPages/Login"; 
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
 
describe("Login Page Tests", () => { 
 
  it("should show error when fields are empty", async () => { 
    render(<Login />); 
 
    const loginButton = screen.getByRole("button", { 
      name: "Login", 
    }); 
 
    fireEvent.click(loginButton); 
 
    const { toast } = await import("react-toastify"); 
 
    expect(toast.error).toHaveBeenCalledWith( 
      "Please fill all the fields" 
    ); 
  }); 
 
 
  it("should login successfully", async () => { 
    axios.post.mockResolvedValue({ 
      data: { 
        message: "Login successful", 
      }, 
    }); 
 
    render(<Login />); 
 
    fireEvent.change( 
      screen.getByPlaceholderText("Email Address"), 
      { 
        target: { 
          value: "test@gmail.com", 
          name: "email", 
        }, 
      } 
    ); 
 
    fireEvent.change( 
      screen.getByPlaceholderText("Password"), 
      { 
        target: { 
          value: "123456", 
          name: "password", 
        }, 
      } 
    ); 
 
    fireEvent.click( 
      screen.getByRole("button", { 
        name: "Login", 
      }) 
    ); 
 
    await waitFor(() => { 
      expect(axios.post).toHaveBeenCalled(); 
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard"); 
    }); 
  }); 
 
 
  it("should show error when login fails", async () => { 
    axios.post.mockRejectedValue({ 
      response: { 
        data: { 
          message: "Invalid email or password", 
        }, 
      }, 
    }); 
 
    render(<Login />); 
 
    fireEvent.change( 
      screen.getByPlaceholderText("Email Address"), 
      { 
        target: { 
          value: "wrong@gmail.com", 
          name: "email", 
        }, 
      } 
    ); 
 
    fireEvent.change( 
      screen.getByPlaceholderText("Password"), 
      { 
        target: { 
          value: "wrong123", 
          name: "password", 
        }, 
      } 
    ); 
 
    fireEvent.click( 
      screen.getByRole("button", { 
        name: "Login", 
      }) 
    ); 
 
    const { toast } = await import("react-toastify"); 
 
    await waitFor(() => { 
      expect(toast.error).toHaveBeenCalledWith( 
        "Invalid email or password" 
      ); 
    }); 
  }); 
 
});