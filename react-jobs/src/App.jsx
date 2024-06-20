import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider 
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  const addJob = async (newJob) => {
    await fetch('/api/jobs', { 
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });

    return;
  };

  const editJobSubmit = async (job) => {
    await fetch(`/api/jobs/${job.id}`, { 
      method: "PUT", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    });

    return;
  };

  const deleteJobSubmit = async (id) => {
    await fetch(`/api/jobs/${id}`, { 
      method: "DELETE"
    });

    return;
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/jobs/:id' element={<JobPage deleteJobSubmit={deleteJobSubmit}/>} loader={jobLoader} />
        <Route path='/edit-job/:id' element={<EditJobPage editJobSubmit={editJobSubmit} />} loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default App