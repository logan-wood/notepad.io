// Import required dependencies
import { render, fireEvent, screen } from "@testing-library/react";
import SignUp from "./Signup";

describe("SignUp", () => {

  // tests input areas and buttons are displayed
  it("shows the input areas and sign up buttons", () => {
    render(<SignUp />);
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign up with Email")).toBeInTheDocument();
    expect(screen.getByText("Sign up with Google")).toBeInTheDocument();
  });

  // tests that signUpWithEmail functionality is called
  it("calls signUpWithEmail function whenever Sign up with Email button is clicked", () => {
    const signUpWithEmail = jest.fn();
    render(<SignUp signUpWithEmail={signUpWithEmail} />);
    fireEvent.click(screen.getByText("Sign up with Email"));
    expect(signUpWithEmail).toHaveBeenCalled();
  });

  // tests that signUpWithGoogle functionality is called
  it("calls signUpWithGoogle function whenever Sign up with Google button is clicked", () => {
    const signUpWithGoogle = jest.fn();
    render(<SignUp signUpWithGoogle={signUpWithGoogle} />);
    fireEvent.click(screen.getByText("Sign up with Google"));
    expect(signUpWithGoogle).toHaveBeenCalled();
  });

  // tests that users are moved to dashboard after successful sign up
  it("navigates to dashboard on successful sign up", async () => {
    const signUpWithEmail = jest.fn(() => Promise.resolve());
    const navigate = jest.fn();
    render(<SignUp signUpWithEmail={signUpWithEmail} navigate={navigate} />);
    fireEvent.click(screen.getByText("Sign up with Email"));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/dashboard"));
  });
});
