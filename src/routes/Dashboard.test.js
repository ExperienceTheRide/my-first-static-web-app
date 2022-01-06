import React from 'react'
import { render } from '@testing-library/react'

describe('Dashboard', () => {

    let Dashboard

    beforeEach(async () => {
        const DashboardObject = await import('./Dashboard.jsx')
        Dashboard = DashboardObject.default
    })

    afterEach(() => {
        jest.resetModules()
        jest.resetAllMocks()
    })

    it('renders without crashing', () => {
        render(<Dashboard />);
    })

    it('renders without crashing', () => {
        const { getByTestId } = render(<Dashboard />);
        expect(getByTestId("text").textContent).toBe('This is the Bus!')
    })
})