import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from '../../config/axios';

const Project = () => {
    const location = useLocation();
    // console.log(location.state.project);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ProjectUsers , setProjectUsers] = useState([]);

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/users/all');
                // console.log(response.data.data);
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        axios.get(`/projects/get-project/${location.state.project._id}`)
        .then((res) =>
            setProjectUsers(res.data.users) 
        )
        .catch((err) => console.error('Error fetching project users:', err));

        if (isUserModalOpen) {
            fetchUsers();
            
        }
    }, [isUserModalOpen , isSidePanelOpen]);

    const addCollaborators = async() => {
        try {
            const response = await axios.put('/projects/addUser', {
                projectId: location.state.project._id,
                users: Array.from(selectedUserId)
            });
            console.log('Users added to project:', response.data);
        } catch (error) {
            console.error('Error adding users to project:', error);
        }
    };


    const handleUserSelect = (userId) => {
        if (selectedUserId.includes(userId)) {
            setSelectedUserId(selectedUserId.filter(id => id !== userId));
        } else {
            setSelectedUserId([...selectedUserId, userId]);
        }
        // setIsUserModalOpen(false);
    };
  return (
    <main className='h-screen w-screen flex '>

        <section className="left flex flex-col h-full min-w-96 h-screen relative bg-slate-300">
            <header className='flex justify-between items-center p-2 px-4 w-full bg-slate-100'>
              <button className='flex gap-2 hover:opacity-80 transition' onClick={() => setIsUserModalOpen(true)}>
                <i className="ri-add-fill mr-1">Add Collaborator</i>
              </button>
              <button className='p-2' onClick={()=> setIsSidePanelOpen(!isSidePanelOpen)}>
                <i className="ri-group-fill"></i>
              </button>
            </header>

            <div className="conversation-area flex flex-col flex-grow">
              <div className="message-box flex-grow flex flex-col gap-2 p-1">
                <div className="incoming message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                  <small className='opacity-65 text-xs'>example@gmail.com</small>
                  <p className='text-sm'>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </p> 
                </div>
                <div className="message ml-auto max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                  <small className='opacity-65 text-xs'>example@gmail.com</small>
                  <p className='text-sm'>Lorem ipsum dolor sit amet </p> 
                </div>
              </div>

              <div className="input-field w-full flex">
                <input type="text" placeholder='Enter Message' className='flex-grow p-2 px-4 border-none outline-none bg-white' />
                <button className='px-5 bg-slate-950 text-white'><i className="ri-send-plane-fill" ></i></button>
              </div>
            </div>

            <div className={`side-panel w-full h-full flex flex-col bg-slate-50 absolute transition-all ${isSidePanelOpen?'translate-x-0':'-translate-x-full'} top-0`}>

              <header className='flex justify-between item-center p-2 px-3 w-full bg-slate-100'> 
                <h2 className='font-semibold text-lg p-2 '>Collaborators</h2>
                
                <button className='p-2'>
                  <i className="ri-close-fill font-semibold text-lg" onClick={()=> setIsSidePanelOpen(false)}></i>
                </button>
              </header>
                <div className="users flex flex-col gap-2">

                    {ProjectUsers?.map(user => 


                        (
                            <div key = {user._id} className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                                <div  className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                    <i className="ri-user-fill absolute"></i>
                                </div>
                                <h1 className='font-semibold text-lg '>{user.email}</h1>
                            </div>
                        )


                    )}
                </div>
            </div>
        </section>

        {/* User Selection Modal */}
        {isUserModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
                <div className='bg-white rounded-lg shadow-lg max-w-md w-full max-h-96 flex flex-col'>
                    {/* Modal Header */}
                    <div className='flex justify-between items-center p-4 border-b border-gray-200 sm:p-5'>
                        <h2 className='text-lg sm:text-xl font-semibold text-gray-800'>Select a User</h2>
                        <button
                            onClick={() => setIsUserModalOpen(false)}
                            className='text-gray-500 hover:text-gray-700 transition text-xl'
                        >
                            <i className='ri-close-line'></i>
                        </button>
                    </div>

                    {/* Modal Body - Users List */}
                    <div className='flex-grow overflow-y-auto'>
                        {loading ? (
                            <div className='flex items-center justify-center h-32'>
                                <p className='text-gray-500'>Loading users...</p>
                            </div>
                        ) : users.length > 0 ? (
                            <ul className='divide-y divide-gray-200'>
                                {users.map((user) => (
                                    <li
                                        key={user._id}
                                        onClick={() => handleUserSelect(user._id)}
                                        className={`p-4 sm:p-5 cursor-pointer transition hover:bg-blue-50 ${
                                            selectedUserId.includes(user._id) ? 'bg-blue-100' : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className='flex items-center gap-3 sm:gap-4'>
                                            {/* User Avatar */}
                                            <div className='flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold'>
                                                {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                                            </div>

                                            {/* User Info */}
                                            <div className='flex-grow min-w-0'>
                                                <h3 className='font-medium text-gray-900 text-sm sm:text-base truncate'>
                                                    {user.name || 'User'}
                                                </h3>
                                                <p className='text-gray-500 text-xs sm:text-sm truncate'>
                                                    {user.email}
                                                </p>
                                            </div>

                                            {/* Selection Indicator */}
                                            {selectedUserId === user._id && (
                                                <div className='flex-shrink-0 text-blue-600'>
                                                    <i className='ri-checkbox-circle-fill text-lg sm:text-xl'></i>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className='flex items-center justify-center h-32'>
                                <p className='text-gray-500'>No users available</p>
                            </div>
                        )}
                    </div>

                    {/* Modal Footer */}
                    <div className='flex gap-2 p-4 border-t border-gray-200 sm:p-5'>
                        <button
                            onClick={() => setIsUserModalOpen(false)}
                            className='flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium text-sm sm:text-base'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                if (selectedUserId) {
                                    console.log('Selected User ID:', selectedUserId);
                                    setIsUserModalOpen(false);
                                }
                                addCollaborators();
                            }}
                            disabled={selectedUserId.length === 0}
                            className={`flex-1 px-4 py-2 text-white rounded-lg font-medium text-sm sm:text-base transition ${
                                selectedUserId
                                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )}
    </main>
  )
}

export default Project