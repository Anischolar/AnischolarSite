import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../Config/firebase.config';

const htmlToText = (html) => {
  return html
    .replace(/<ul>/g, '')
    .replace(/<\/ul>/g, '')
    .replace(/<li>/g, '- ')
    .replace(/<\/li>/g, '\n')
    .trim();
};

const textToHtml = (text) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const listItems = lines.map(line =>
    `<li>${line.replace(/^- /, '').trim()}</li>`
  ).join('');
  return `<ul>${listItems}</ul>`;
};

const ReadMore = ({ text, maxLength }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => setIsReadMore(!isReadMore);

  return (
    <span>
      {isReadMore ? (
        <span dangerouslySetInnerHTML={{ __html: text.slice(0, maxLength) + (text.length > maxLength ? '...' : '') }} />
      ) : (
        <span dangerouslySetInnerHTML={{ __html: text }} />
      )}
      {text.length > maxLength && (
        <span onClick={toggleReadMore} style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}>
          {isReadMore ? 'Read More' : 'Show Less'}
        </span>
      )}
    </span>
  );
};

const Experience = ({ user, authUser }) => {
  const [experienceList, setExperinceList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    workSummery: ''
  });

  useEffect(() => {
    if (user) setExperinceList(user?.experience || []);
  }, [user?.firstName]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'currentlyWorking') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        endDate: checked ? '' : prev.endDate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const experienceToSave = {
      ...formData,
      workSummery: textToHtml(formData.workSummery)
    };

    let newExperiences;
    if (editingIndex !== null) {
      newExperiences = [...experienceList];
      newExperiences[editingIndex] = experienceToSave;
    } else {
      newExperiences = [...experienceList, experienceToSave];
    }

    setIsLoading(true);
    try {
      const userDataRef = collection(db, "userData");
      const q = query(userDataRef, where("userId", "==", authUser?.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { experience: newExperiences });

        // Update local state only after successful Firestore update
        setExperinceList(newExperiences);
        setIsModalOpen(false);
        setFormData({
          title: '',
          companyName: '',
          city: '',
          state: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          workSummery: ''
        });
        alert("Experience saved successfully!");
      } else {
        alert("No user document found!");
      }
    } catch (error) {
      console.error("Error saving experience:", error);
      alert("Failed to save experience. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = (experience, index) => {
    setFormData({
      ...experience,
      workSummery: htmlToText(experience.workSummery)
    });
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className='my-2 '>
      <div className='flex justify-between'>
        <h2 className="font-bold text-lg mb-2">Experience</h2>

        {authUser && (
          <button
            onClick={() => {
              setFormData({
                title: '',
                companyName: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                currentlyWorking: false,
                workSummery: ''
              });
              setEditingIndex(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center rounded-full bg-gray-200 p-2 border border-gray-300 text-gray-700 transition-all shadow-md hover:bg-gray-300 active:bg-gray-400 focus:ring focus:ring-gray-400/50 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 4.75a.75.75 0 0 1 .75.75v6.25H19a.75.75 0 0 1 0 1.5h-6.25V19a.75.75 0 0 1-1.5 0v-6.25H5a.75.75 0 0 1 0-1.5h6.25V5.5a.75.75 0 0 1 .75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>



        )}
      </div>
      {experienceList?.map((experience, index) => (
        <div key={index} className='my-3 relative group'>
          {authUser && (
            <button
              onClick={() => handleEdit(experience, index)}
              className="absolute right-0 top-0 text-slate-600 hover:text-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          )}
          <h2 className='text-sm font-bold'>{experience?.title}</h2>
          <h2 className='text-xs flex justify-between'>
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>{experience?.startDate} To {experience?.currentlyWorking ? 'Present' : experience.endDate}</span>
          </h2>
          <div className='text-xs my-2'>
            <ReadMore text={experience?.workSummery || ''} maxLength={100} />
          </div>
          <hr className='mt-3' style={{ borderColor: 'grey' }} />
        </div>
      ))}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="relative mx-auto w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">
              {editingIndex !== null ? 'Edit Experience' : 'Add Experience'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    disabled={formData.currentlyWorking}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={formData.currentlyWorking}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-slate-800 focus:ring-slate-800"
                />
                <label className="ml-2 text-sm text-gray-700">Currently Working Here</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Work Summary (Use bullet points - start each with "- ")
                </label>
                <textarea
                  name="workSummery"
                  value={formData.workSummery}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 h-32"
                  placeholder="Example:
- Managed team of 5 developers
- Implemented new features using React
- Improved application performance"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-md hover:bg-slate-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' :
                    (editingIndex !== null ? 'Save Changes' : 'Add Experience')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;