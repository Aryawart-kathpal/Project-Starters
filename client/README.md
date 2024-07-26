## Initialising with VITE
npm create vite@latest <project_name> -- --template react

## Tailwind setup
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

tailwind.config.cjs

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- Add the Tailwind directives to your CSS

index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Using DaisyUI

[DaisyUI](https://daisyui.com/)

```sh
npm i  -D daisyui@latest @tailwindcss/typography
```

tailwind.config.js

```js
{
 plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
```

## Install all libraries

```sh
npm i axios @reduxjs/toolkit @tanstack/react-query @tanstack/react-query-devtools react-icons react-redux react-router-dom react-toastify
```

## Setup pages components Redux Slices and App.jsx


## Sample App.js using latest react-router
```sh
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { About ,Cart,Checkout,Error,HomeLayout,Landing,Login,Orders,Products,Register,SingleProduct} from "./pages";
import { ErrorElement } from "./components";

//loaders
import {loader as landingLoader} from "./pages/Landing";
import {loader as singleProductLoader} from "./pages/SingleProduct";
import {loader as productsLoader} from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";

//actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";

import {store} from "./store";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:1000*60*5,
    },
  }
});

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>   ,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>,
        loader:landingLoader(queryClient),
        errorElement: <ErrorElement/>,
      },
      {
        path:'products',
        element:<Products/>,
        loader:productsLoader(queryClient),
      },
      {
        path:'products/:id',
        element:<SingleProduct/>,
        loader:singleProductLoader(queryClient),
      },
      {
        path:'cart',
        element:<Cart/>,
      },
      {
        path:'about',
        element:<About/>,
      },
      {
        path:'checkout',
        element:<Checkout/>,
        loader: checkoutLoader(store),
        action:checkoutAction(store,queryClient),
      },
      {
        path:'orders',
        element:<Orders/>,
        loader:ordersLoader(store,queryClient),
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>,
    errorElement:<Error/>,
    action:loginAction(store),
  },
  {
    path:'/register',
    element:<Register/>,
    errorElement:<Error/>,
    action:registerAction,
  }
]);

const App = () => {
  return(
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App;

```

## Main.jsx

```sh
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { store } from './store.js';
import './index.css'
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
        <ToastContainer position='top-center'/>
    </Provider>
)

```