import {render, screen} from '@testing-library/react';
import { Button } from "@/components"

describe("Button Component", () => {
  test("renders with name and icon", () => {
    const mockIcon = <svg data-testid="icon" />
    const mockName = <span>Click Me</span>

    render(<Button name={mockName} icon={mockIcon} rounded={true} buttonType="button" className="font-bold" />)

    // Check if the button renders with the provided name
    expect(screen.getByText("Click Me")).toBeDefined()

    // Check if the icon is rendered
    expect(screen.getByTestId("icon")).toBeDefined()

    // Check if the button has the correct classes
    const buttonElement = screen.getByRole("button")

    const expectedClasses = [
        "bg-black",
        "hover:bg-blue-700",
        "text-white",
        "text-sm",
        "p-4",
        "rounded-[24px]",
        "font-bold",
        "flex",
        "items-center",
        "justify-center",
        "whitespace-normal",
        "break-words"
      ];
      
      expectedClasses.forEach(className => {
        expect(buttonElement.classList).toContain(className);
      })
  })
})