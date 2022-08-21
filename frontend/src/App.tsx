import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Home from "./pages/Home";
import Shift from "./pages/Shift/Shift";
import ShiftForm from "./pages/ShiftForm";
import { ThemeProvider } from "@material-ui/core";
import { staffanyTheme } from "./commons/theme";

function App() {
  return (
    <ThemeProvider theme={staffanyTheme}>
      <BrowserRouter>
        <Switch>
          <Dashboard>
            <Route path="/">
                <Home />
            </Route>
            <Route path="/shift">
                <Shift />
            </Route>
            <Route path="/shift/add">
                <ShiftForm />
            </Route>
            <Route path="/shift/:id/edit">
                <ShiftForm />
            </Route>
          </Dashboard>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
