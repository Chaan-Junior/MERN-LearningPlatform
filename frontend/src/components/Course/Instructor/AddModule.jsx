import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const AddModulesPage = () => {
  const { courseCode } = useParams(); // Extract course ID from URL
  const [course, setCourse] = useState(null);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedModuleItemId, setSelectedModuleItemId] = useState(null);
  const [newModuleItem, setNewModuleItem] = useState({ title: '', type: '', url: '' });
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/${courseCode}`);
        const data = await response.json();
        setCourse(data.course);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    // Check if there's data in localStorage
    const storedCourseData = localStorage.getItem('courseData');
    if (storedCourseData) {
      setCourse(JSON.parse(storedCourseData));
    } else {
      fetchCourseDetails();
    }
  }, [courseCode]);

  let navigate = useNavigate();

  const handleAddModule = async () => {
    try {
      const response = await fetch(`http://localhost:8070/api/courses/${courseCode}/modules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newModuleTitle })
      });
      if (response.ok) {
        const data = await response.json();
        setCourse(prevCourse => ({
          ...prevCourse,
          modules: [...prevCourse.modules, data.module]
        }));
        setNewModuleTitle('');
      } else {
        console.error('Error adding module:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding module:', error);
    }
  };

  const handleAddModuleItem = async () => {
    try {
      const response = await fetch(`http://localhost:8070/api/module/${selectedModuleId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newModuleItem)
      });
      if (response.ok) {
        const data = await response.json();
        setCourse(prevCourse => {
          const updatedModules = prevCourse.modules.map(module => {
            if (module._id === selectedModuleId) {
              // Update module item list for the selected module
              return {
                ...module,
                moduleItems: [...module.moduleItems, data.moduleItem]
              };
            }
            return module;
          });
          return { ...prevCourse, modules: updatedModules };
        });
        setNewModuleItem({ title: '', type: '', url: '' });
      } else {
        console.error('Error adding module item:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding module item:', error);
    }
  };

  const handleDeleteModuleItem = async (selectedModuleId, itemId) => {
    try {
      console.log("Selected Module ID:", selectedModuleId);
      console.log("Item ID:", itemId);
      const response = await fetch(`http://localhost:8070/api/item/${selectedModuleId}/items/${itemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted module item from the state
        setCourse(prevCourse => {
          const updatedModules = prevCourse.modules.map(module => {
            if (module._id === selectedModuleId) {
              // Filter out the deleted module item
              return {
                ...module,
                moduleItems: module.moduleItems.filter(item => item._id !== itemId)
              };
            }
            return module;
          });
          return { ...prevCourse, modules: updatedModules };
        });
      } else {
        console.error('Error deleting module item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting module item:', error);
    }
  };

  const handleUpdateModuleItem = async (itemId) => {
    try {
      console.log('Update item:', itemId);

      // Find the module item by ID
      const moduleItemToUpdate = course.modules.flatMap(module => module.moduleItems).find(item => item._id === itemId);
      if (!moduleItemToUpdate) {
        console.error('Module item not found');
        return;
      }

      // Update the module item details
      const updatedModuleItem = { ...moduleItemToUpdate, ...newModuleItem };

      // Send a PUT request to update the module item
      const response = await fetch(`http://localhost:8070/api/item/moduleItems/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedModuleItem)
      });

      if (response.ok) {
        // Update the module item in the state
        setCourse(prevCourse => {
          const updatedModules = prevCourse.modules.map(module => {
            const updatedModuleItems = module.moduleItems.map(item => {
              if (item._id === itemId) {
                return updatedModuleItem;
              }
              return item;
            });
            return { ...module, moduleItems: updatedModuleItems };
          });
          return { ...prevCourse, modules: updatedModules };
        });

        // Reset the newModuleItem state
        setNewModuleItem({ title: '', type: '', url: '' });

        console.log('Module item updated successfully');
      } else {
        console.error('Error updating module item:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating module item:', error);
    }
  };

  const toggleModuleItems = moduleId => {
    setExpandedModules(prevState => ({
      ...prevState,
      [moduleId]: !prevState[moduleId]
    }));
  };

  return (
  <><div>
  <div className="container mx-auto">
      {course && (
        <div>
          <h1 className="text-4xl font-bold mt-8 mb-4">{course.courseName}</h1>
          <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-md bg-gray-200">
            <h2 className="text-2xl font-semibold text-black mb-4">What you'll learn</h2>
            <p className="text-lg text-gray-600">{course.description}</p>
          </div>
          <p className="text-gray-700 mt-2 text-lg">Price: {course.price}</p>
          <p className="text-gray-700 text-lg">Instructor: {course.Instructor.join(', ')}</p>
          <input
            className="border border-gray-300 rounded-md p-2 mt-4 mb-2"
            type="text"
            value={newModuleTitle}
            onChange={e => setNewModuleTitle(e.target.value)}
            placeholder="Enter module title" />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddModule}
          >
            Add Module
          </button>
          {/* Display existing modules */}
          <h2 className="text-lg font-bold mt-4">Existing Modules:</h2>
          <ul>
            {course.modules.map(module => (
              <li key={module._id} className="mt-4">
                <div>
                  <h3 className="text-xl font-semibold flex items-center justify-between border-b border-gray-300 py-2">
                    <span>{module.title}</span>
                    <FontAwesomeIcon
                      icon={expandedModules[module._id] ? faChevronUp : faChevronDown}
                      onClick={() => toggleModuleItems(module._id)}
                      className={`ml-2 cursor-pointer ${expandedModules[module._id] ? 'text-green-500' : 'text-red-500'}`} />
                  </h3>
                  {expandedModules[module._id] && (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2"
                        onClick={() => setSelectedModuleId(module._id)}
                      >
                        Add Module Item
                      </button>
                      {selectedModuleId === module._id && (
                        <div className="mt-2">
                          <input
                            className="border border-gray-300 rounded-md p-2 mr-2"
                            type="text"
                            value={newModuleItem.title}
                            onChange={e => setNewModuleItem({ ...newModuleItem, title: e.target.value })}
                            placeholder="Enter module item title" />
                          <input
                            className="border border-gray-300 rounded-md p-2 mr-2"
                            type="text"
                            value={newModuleItem.type}
                            onChange={e => setNewModuleItem({ ...newModuleItem, type: e.target.value })}
                            placeholder="Item type (video/file)" />
                          <input
                            className="border border-gray-300 rounded-md p-2 mr-2"
                            type="text"
                            value={newModuleItem.url}
                            onChange={e => setNewModuleItem({ ...newModuleItem, url: e.target.value })}
                            placeholder="Enter module item URL" />
                          <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                            onClick={handleAddModuleItem}
                          >
                            Add Module Item
                          </button>
                        </div>
                      )}
                      {/* Display module items */}
                      <ul className="mt-2">
                        {module.moduleItems && module.moduleItems.length > 0 ? (
                          module.moduleItems.map(item => (
                            <li key={item && item._id} className="bg-gray-100 rounded-lg p-4 shadow-md mb-2">
                              <div>
                                {item && item._id && (
                                  <>
                                    <p className="text-lg font-semibold mb-1">Title: {item.title}</p>
                                    <p className="text-gray-700">Type: {item.type}</p>
                                    <a href={item.url} className="text-blue-500 hover:underline">URL: {item.url}</a>
                                    <div className="mt-2">
                                      <button
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        onClick={() => setSelectedModuleItemId(item._id)}
                                      >
                                        Update
                                      </button>
                                      {selectedModuleItemId === item._id && (
                                        <div className="mt-2">
                                          <input
                                            className="border border-gray-300 rounded-md p-2 mr-2"
                                            type="text"
                                            value={newModuleItem.title}
                                            onChange={e => setNewModuleItem({ ...newModuleItem, title: e.target.value })}
                                            placeholder="Enter module item title" />
                                          <input
                                            className="border border-gray-300 rounded-md p-2 mr-2"
                                            type="text"
                                            value={newModuleItem.type}
                                            onChange={e => setNewModuleItem({ ...newModuleItem, type: e.target.value })}
                                            placeholder="Item type (video/file)" />
                                          <input
                                            className="border border-gray-300 rounded-md p-2 mr-2"
                                            type="text"
                                            value={newModuleItem.url}
                                            onChange={e => setNewModuleItem({ ...newModuleItem, url: e.target.value })}
                                            placeholder="Enter module item URL" />
                                          <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => handleUpdateModuleItem(item._id)}
                                          >
                                            Update Module Item
                                          </button>
                                        </div>
                                      )}
                                      <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => handleDeleteModuleItem(module._id, item._id)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </li>
                          ))
                        ) : null}
                      </ul>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default AddModulesPage;
