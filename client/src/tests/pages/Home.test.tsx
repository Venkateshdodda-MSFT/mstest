import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from "@/pages"

vi.mock("@/utils/recipes", async() => {
    const { meals } = await import("../mocks/meals")
    return {
        fetchProducts: vi.fn().mockResolvedValueOnce(meals)
    }
    
})

vi.mock('circletype', () => {
    return {
        default: vi.fn().mockImplementation(() => {
            return {
                radius: vi.fn().mockReturnThis(), 
                dir: vi.fn().mockReturnThis(),
                forceWidth: vi.fn().mockReturnThis(),
                forceHeight: vi.fn().mockReturnThis(),
                refresh: vi.fn().mockReturnThis(),
                destroy: vi.fn(),
            };
        }),
    };
});

describe("Home page component", () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
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
    });
    it("renders home page content, get app spinner, and keen slider", async () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        expect(screen.getByText("Get Your Favorite Food With Ease")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /order now/i })).toBeInTheDocument()
        expect(screen.getByRole("link", {"name": /Order Now/i })).toHaveAttribute("href", "/products")
        expect(screen.getByText("Trending Recipes")).toBeInTheDocument()
        expect(screen.getByText("GET THE APP. GET THE APP. GET THE APP.")).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByText("Chicken Karaage")).toBeInTheDocument();
            expect(screen.getByText("Honey Teriyaki")).toBeInTheDocument();
            expect(screen.getByText("Japanese gohan")).toBeInTheDocument();
            //slider images and hero image
            expect(screen.getAllByRole("img").length).toBe(11);
        })

    })
})