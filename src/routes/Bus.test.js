import React from 'react'
import { render } from '@testing-library/react'

describe('Bus', () => {

    let Bus

    beforeEach(async () => {
        const BusObject = await import('./Bus.jsx')
        Bus = BusObject.default
    })

    afterEach(() => {
        jest.resetModules()
        jest.resetAllMocks()
    })

    it('renders without crashing', () => {
        render(<Bus />);
    })

    it('renders without crashing', () => {
        const { getByTestId } = render(<Bus />);
        expect(getByTestId("text").textContent).toBe('This is the Bus!')
    })
})