import { render, screen } from '@testing-library/react';
import { Rating } from '@/components'



describe('Rating component', () => {
    const getSolidStars = () => screen.getAllByTestId('solid-star');
    const getRegularStars = () => screen.getAllByTestId('regular-star');

    it('should render 5 solid stars when rating is 5', () => {
        render(<Rating rating={5} />);

        expect(getSolidStars().length).toBe(5);
    });

    it('should render 3 solid stars and 2 regular stars when rating is 3', () => {
        render(<Rating rating={3} />);

        expect(getSolidStars().length).toBe(3);
        expect(getRegularStars().length).toBe(2);
    });

    it('should render 0 solid stars and 5 regular stars when rating is 0', () => {
        render(<Rating rating={0} />);
        expect(getRegularStars().length).toBe(5);
    });

    it('should apply the className prop correctly', () => {
        render(<Rating rating={3} className="custom-class" />);
        const ratingDiv = screen.getByTestId('rating-group');
        expect(ratingDiv).toHaveClass('custom-class');
    });

});
