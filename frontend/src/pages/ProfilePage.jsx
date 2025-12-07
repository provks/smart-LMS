import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProfilePage() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const {user} = useAuth();

  // get user profile details
  useEffect(() => {
    const getUserProfile = async () => {
      setIsloading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user}`
          }
        }
        const user = await axios.get(BACKEND_URL+'/api/user/profile', config);
        setName(user.name);
        setEmail(user.email);
      } catch (error) {
        console.error('Error fetching user info!', error.message)
      } finally {
        setIsloading(false);
      }
    }

    if (user) {
      getUserProfile();
    }

  }, [user]);

  if (isLoading) return <p>Loading your details!</p>


  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔄 Call your update API here
    console.log("Updated User:", { id: user.id, name, email });

    const updateUserProfile = async () => {
      setIsloading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user}`
          }
        }
        const user = await axios.put(BACKEND_URL+'/api/user/profile', config);
        setName(user.name);
        setEmail(user.email);
      } catch (error) {
        console.error('Error fetching user info!', error.message)
      } finally {
        setIsloading(false);
      }
    }

    if (user) {
      updateUserProfile();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Auto hide alert
    }

  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">👤 My Profile</h3>

              {success && (
                <div className="alert alert-success text-center" role="alert">
                  ✅ Profile updated successfully!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* ID (read-only) */}
                {/* 
                <div className="mb-3">
                  <label htmlFor="userId" className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    value={user.id}
                    readOnly
                  />
                </div>
                */}

                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
