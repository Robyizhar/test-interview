
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import store from './store/store';
import {listen} from './store/listen';
import { Provider } from 'react-redux';
import Sidebar from './component/Sidebar'
import Navbar from './component/Navbar'
import Index from './component/Index';
import Form from "./component/Form";

function App() {

  React.useEffect(() => {
    listen();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Sidebar></Sidebar>
        <div className='page-wrapper'>
          <Navbar></Navbar>
          <div className='page-content'>
            <Routes>
              <Route exact path="/" element={<Index/>}></Route>
              <Route path="/form" element={<Form/>}></Route>
              <Route path="/form/:id" element={<Form/>}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
