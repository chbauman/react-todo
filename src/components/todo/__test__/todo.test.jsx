import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './../todo';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Todo todo_data={{ id: 0, value: "First task" }}></Todo>, div);
})