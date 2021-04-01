import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './../todo';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Todo todo_data={{ id: 0, value: "First task" }}></Todo>, div);
})

it("renders todo correctly", () => {
    const { getByTestId } = render(<Todo todo_data={{ id: 1, value: "Second task" }}></Todo>);
    expect(getByTestId("todo")).toHaveClass("row");
})