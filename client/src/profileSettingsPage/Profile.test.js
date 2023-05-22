import React from "react";
import { render,screen } from "@testing-library/react";
import { useSelector,useDispatch } from "react-redux";
import Profile from "./Profile";

// Mock the useSelector function
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Profile", () => {
  it("renders user information correctly", () => {
    // Set up the mocked user data
  const user = useSelector((state) => state.user);

    // Mock the useSelector hook to return
    useSelector.mockReturnValue(user);
    render(<Profile />);
    //check if uid is rendered
    expect(screen.getByText("user1")).toBeInTheDocument();
    //check if name is rendered
    expect(screen.getByText(user.username)).toBeInTheDocument();
    //check if email is rendered
    expect(screen.getByText(user.email)).toBeInTheDocument();
  });
  it("renders the sidebar with settings option", () => {
    //check if settings button is rendered
    render(<Profile />);

    expect(
      screen.getByRole("button", { name: "Settings" })
    ).toBeInTheDocument();
    //check if profile button is rendered
    expect(screen.getByRole("button", { name: "Profile" })).toBeInTheDocument();
  });
});
