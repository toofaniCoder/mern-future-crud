import React from 'react';
import ReactDOM from 'react-dom/client';

import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline } from '@mui/joy';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

// import font for MUI Joy UI
import '@fontsource/public-sans';

// import our routes
import Layout from './routes/layout';
import Home from './routes/home';
import Students from './routes/students';
import CreateStudent from './routes/create-student';
import EditStudent from './routes/edit-student';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'students',
        element: <Students />,
        loader: Students.getAllStudents,
      },
      {
        path: 'students/create',
        element: <CreateStudent />,
      },
      {
        path: 'students/:id/edit',
        element: <EditStudent />,
        loader: EditStudent.getStudent,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider>
    <CssBaseline />
    <RouterProvider router={router} />
  </CssVarsProvider>
);
