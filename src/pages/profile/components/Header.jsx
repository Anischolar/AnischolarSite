import React, { useEffect, useState } from 'react'
import { Input } from '../../resumes/resume/ui/input';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { db, storage } from '../../../Config/firebase.config';
import logo from '../../../assets/img/logo3.png';
import { LoaderCircle } from 'lucide-react';

const Header = ({ user, authUser, onUpdate }) => {


  const [editingInfo, setEditingInfo] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [coverPicture, setCoverPic] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    title: '',
    company: '',
    address: '',
    profilePicture: null,
    coverPicturee: null
  });

  useEffect(() => {
    if (user) {
      setInfo((prev) => ({
        ...prev,
        firstName: user?.firstName,
        lastName: user?.lastName,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        title: user?.title,
        company: user?.company,
        address: user?.address,
        profilePicture: user.profilePicture || null,
        coverPicturee: user.coverPicturee || null,
      }));

    }
  }, [user?.firstName]);
  console.log(info);


  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleCoverPicChange = (e) => {
    const file2 = e.target.files[0];
    setCoverPic(file2);
  };

  async function updateInfo() {
    setIsLoading(true);
    try {
      const userDataRef = collection(db, "userData");
      const q = query(userDataRef, where("userId", "==", authUser?.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        let updatedProfilePicUrl = info.profilePicture;
        let updatedCoverPic = info.coverPicturee;

        if (profilePic) {
          const profilePicRef = ref(storage, `profilePictures/${authUser?.uid}`);
          await uploadBytes(profilePicRef, profilePic);
          updatedProfilePicUrl = {
            url: await getDownloadURL(profilePicRef),
            fileType: profilePic.type,
            fileName: profilePic.name,
          }
        }

        if (coverPicture) {
          const coverPicRef = ref(storage, `coverPictures/${authUser?.uid}`);
          await uploadBytes(coverPicRef, coverPicture);
          updatedCoverPic = {
            url: await getDownloadURL(coverPicRef),
            fileType: coverPicture.type,
            fileName: coverPicture.name,
          };
        }

        // Update Firestore document with updated cvData including profilePicture object
        const updatedInfo = {
          ...info,
          profilePicture: updatedProfilePicUrl || info?.profilePicture,
          coverPicturee: updatedCoverPic || info?.coverPicturee,
        };
        await updateDoc(docRef, updatedInfo);
        alert("updated successfully!");
        setIsLoading(true);
      } else {
        console.log("No document found with the specified userId.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setEditingInfo(false);
  }

  return (
    <div className="bg-white rounded border border-gray-300 overflow-hidden pb-4">
      <img
        className="w-full h-48 object-cover"
        src={info?.coverPicturee?.url || logo}
        alt=""
      />

      <div className="relative w-28 h-28 rounded-full border-4 border-black overflow-hidden -mt-14 ml-4">
        <img
          className="w-full h-full object-cover"
          src={info?.profilePicture?.url}
          alt=""
        />
      </div>

      <div className="grid grid-cols-[1fr_auto] px-4">
        <div>
          {!editingInfo ? (
            <div>
              <div className="mt-2 font-bold">{info?.firstName + " " + info?.lastName}</div>
              <div className="text-gray-500">{info?.phoneNumber + " | " + info?.email}</div>
              <div className="text-gray-600">{info?.title + " at " + info?.company}</div>
              <div className="text-gray-500">{info?.address}</div>
            </div>
          ) : (
            <div>
              {editingInfo && (
                <div className="flex gap-2 justify-end">
                  <button
                    className="bg-gray-100 w-8 h-8 rounded-full grid place-items-center hover:bg-gray-300 transition-colors"
                    onClick={() => {
                      setEditingInfo(false);
                      setInfo({
                        firstName: info?.firstName || "",
                        lastName: info?.lastName || "",
                        company: info?.company || "",
                        title: info?.title || "",
                        address: info?.address || "",
                        phoneNumber: info?.phoneNumber || "",
                        email: info?.email || "",
                      });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 384 512">
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </button>
                  <button
                    className="bg-gray-100 w-8 h-8 rounded-full grid place-items-center hover:bg-gray-300 transition-colors"
                    onClick={updateInfo}
                  >
                    {loading ? <LoaderCircle className='animate-spin' /> : 
                    (<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 448 512">
                      <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>)}
                  </button>
                </div>
              )}

              <div className="form-group flex justify-between mb-4">
                <div>
                  <label className="formbold-form-label">Profile Picture</label>
                  <input
                    type="file"
                    onChange={handleProfilePicChange}
                    className="formbold-form-input"
                  />
                </div>

                <div>
                  <label className="formbold-form-label">Cover Picture</label>
                  <input
                    type="file"
                    onChange={handleCoverPicChange}
                    className="formbold-form-input"
                  />
                </div>

              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                  value={info?.firstName}
                  onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
                  placeholder="First name"
                />
                <Input
                  value={info?.lastName}
                  onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
                  placeholder="Last name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                  value={info?.phoneNumber}
                  onChange={(e) => setInfo({ ...info, phoneNumber: e.target.value })}
                  placeholder="Phone Number"
                />
                <Input
                  value={info?.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  placeholder="Email"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                  value={info?.company}
                  onChange={(e) => setInfo({ ...info, company: e.target.value })}
                  placeholder="University"
                />
                <Input
                  value={info?.title}
                  onChange={(e) => setInfo({ ...info, title: e.target.value })}
                  placeholder="title"
                />
              </div>
              <Input
                value={info?.address}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                placeholder="address"
              />
            </div>
          )}
        </div>
        {authUser?.uid == user?.userId && !editingInfo && (
          <div className="flex justify-end mt-2">
            <button
              className="bg-gray-100 w-8 h-8 rounded-full grid place-items-center hover:bg-gray-300 transition-colors"
              onClick={() => {
                setEditingInfo(true);
                setIsLoading(false);
              }}
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
            </button>
          </div>
        )}
      </div>
    </div>

  )
}

export default Header
