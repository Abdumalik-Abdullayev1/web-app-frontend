import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from '../App';
import Home from '../pages/home'
import Shop from '../pages/shop'
import Basket from '../pages/basket'
import Report from '../pages/report'
import Categories from '../pages/categories'
import Detail from '../pages/detail'
import Formalize from '../pages/formalize'

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path='/shop' element={<Shop/>}/>
                <Route path='/basket' element={<Basket/>}/>
                <Route path='/report' element={<Report/>}/>
                <Route path='/categories' element={<Categories/>}/>
                <Route path='/detail' element={<Detail/>}/>
                <Route path='/formalize' element={<Formalize/>}/>
            </Route>
        )
    );
    return <RouterProvider router={router} />;
};

export default Router;
