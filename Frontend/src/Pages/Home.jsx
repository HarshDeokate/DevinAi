import React from 'react'
import {useContext} from 'react'
import UserContext from '../context/userContext.jsx'
import axios from '../../config/axios'

const Home = () => {
  const {user} = useContext(UserContext);
  const [projectName, setProjectName] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  
  function createProject(e){
    e.preventDefault();
    console.log(projectName);
    axios.post('/projects/create', {name: projectName})
      .then((response) => {
        console.log(response.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('There was an error creating the project!', error);
      });
  }
  return (
    
    <main className='p-4'>
      <div className='projects'>
        <button className="project p-4 border border-slate-300 rounded-md" onClick={(e)=>setIsModalOpen(true)}>
          New Project 
          <i className="ri-link ml-2"></i>
        </button>
      </div>
      {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                  <h2 className="text-xl mb-4">Create New Project</h2>
                  <form onSubmit={createProject}>
                      <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Project Name</label>
                          <input
                              onChange={(e) => setProjectName(e.target.value)}
                              value={projectName}
                              type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                      </div>
                      <div className="flex justify-end">
                          <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </main>
  )
}

export default Home