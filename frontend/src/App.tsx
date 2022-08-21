import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Home from "./pages/home/Home";
import Shift from "./pages/shift/Shift";
import ShiftCreate from "./pages/shift/create/ShiftCreate";
import ShiftUpdate from "./pages/shift/update/ShiftUpdate";
import { ThemeProvider } from "@material-ui/core";
import { staffanyTheme } from "./commons/theme";

function App() {
  return (
    <ThemeProvider theme={staffanyTheme}>
      <BrowserRouter>
        <Switch>
          <Dashboard>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/shift">
                <Shift />
            </Route>
            <Route exact path="/shift/add">
                <ShiftCreate />
            </Route>
            <Route path="/shift/:id/edit">
                <ShiftUpdate />
            </Route>
          </Dashboard>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
