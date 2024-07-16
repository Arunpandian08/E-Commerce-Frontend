import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import profileIcon from '../../assets/NavbarIcons/user-logo.jpg';
import { getUser, updateProfile } from '../../Redux/UserSlice';
import Loader from '../../Utilities/Loader/Loader';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
    profileImage: null
  });

  useEffect(() => {
    if (isAuthenticated) {
      window.scrollTo(0, 0);
      dispatch(getUser());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        mobileNumber: user.mobileNumber || '',
        addressLine1: user.address?.addressLine1 || '',
        addressLine2: user.address?.addressLine2 || '',
        zipCode: user.address?.zipCode || '',
        profileImage: null
      });
    }
  }, [user]);

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => updatedData.append(key, value));

    dispatch(updateProfile(updatedData));
    setIsEditing(false);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message || error.toString()}</p>;
  if (!isAuthenticated) return <p className='user-container'>Please login</p>;
  if (!user) return <p className='user-container'>Please login</p>;

  return (
    <div className='user-container animate__animated animate__fadeIn'>
      <div className='user-header'>
        <h3>Hi!&nbsp;{user.name || 'Guest'}</h3>
        {!user.name || !user.address || !user.profileImage && !isEditing ? (
            <button className='edit-button' type='button' onClick={handleEditClick}>Add Profile</button>
          ) : (
            !isEditing && <button className='edit-button' type='button' onClick={handleEditClick}>Edit Profile</button>
          )}
      </div>
      <div className="user-details">
        <div className="user-profile">
          <img src={user.profileImage || profileIcon} alt="profile-img" />
        </div>
        <div className='user-data'>
          <p className='user-mobile'>{user.mobileNumber || '-'}</p>
          <address>
            <h5>Address:</h5>
            <p className='user-address'>{user.address?.addressLine1 || '-'}</p>
            <p className='user-address'>{user.address?.addressLine2 || '-'}</p>
            <p className='user-address'>{user.address?.zipCode || '-'}</p>
          </address>
        </div>
      </div>
      {user && (
        <div className="user-form">
          <form className='form' onSubmit={handleSubmit}>
            <label className='user-label' htmlFor="name">Name</label><br />
            <input type="text" id="name" name="name" placeholder='Enter your Name' value={formData.name} onChange={handleInputChange} readOnly={!isEditing} />
            <label className='user-label' htmlFor="mobile">Mobile Number</label><br />
            <input type="tel" id="mobile" name="mobileNumber" placeholder='Enter your Mobile Number' value={formData.mobileNumber} onChange={handleInputChange} readOnly={!isEditing} />
            <label className='user-label' htmlFor="address1">Address</label><br />
            <input type="text" id="address1" name="addressLine1" placeholder='Address line 1' value={formData.addressLine1} onChange={handleInputChange} readOnly={!isEditing} />
            <input type="text" id="address2" name="addressLine2" placeholder='Address line 2' value={formData.addressLine2} onChange={handleInputChange} readOnly={!isEditing} />
            <input type="text" id="zip" name="zipCode" placeholder='Zip code' value={formData.zipCode} onChange={handleInputChange} readOnly={!isEditing} />
            <label className='user-label' htmlFor="file">Profile Image</label><br />
            <input type="file" id="file" name="profileImage" onChange={handleInputChange} disabled={!isEditing} />

            {isEditing && (
              <button className='submit-btn' type='submit'>
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="white"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span>Upload</span>
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
