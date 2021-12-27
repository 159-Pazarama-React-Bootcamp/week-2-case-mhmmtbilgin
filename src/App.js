import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TodoList from "./components/todoList";
import TodoUpdate from "./components/todoUpdate";
import Index from "./components/login";

function App() {
  return (
    <div>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/update" element={<TodoUpdate />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
