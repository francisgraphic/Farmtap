// src/pages/RegisterFarmer.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function RegisterFarmer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmType, setFarmType] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create user in Firebase Auth
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Optionally: Save farmer profile to Firestore
      // const farmerData = {
      //   farmName,
      //   farmType,
      //   address,
      //   phone,
      //   description,
      //   userId: user.uid,
      //   createdAt: new Date(),
      // };

      // if (image) {
      //   const imageRef = ref(storage, `farmers/${user.uid}/profile-image`);
      //   const snapshot = await uploadBytesResumable(imageRef, image);
      //   const imageUrl = await getDownloadURL(snapshot.ref);
      //   farmerData.image = imageUrl;
      // }

      // await addDoc(collection(db, 'farmers'), farmerData);

      alert('Registration successful!');
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Farmer Registration</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Farm Name */}
        <div>
          <label className="block text-gray-700 mb-2">Farm Name</label>
          <input
            type="text"
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Green Valley Farms"
          />
        </div>

        {/* Farm Type */}
        <div>
          <label className="block text-gray-700 mb-2">Farm Type</label>
          <select
            value={farmType}
            onChange={(e) => setFarmType(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Farm Type</option>
            <option value="Organic">Organic Farm</option>
            <option value="Dairy">Dairy Farm</option>
            <option value="Poultry">Poultry Farm</option>
            <option value="Vegetables">Vegetable Farm</option>
            <option value="Fruits">Fruit Farm</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="123 Green Lane, City"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="+123 456 7890"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Tell us about your farm..."
          ></textarea>
        </div>

        {/* Profile Image (optional) */}
        <div>
          <label className="block text-gray-700 mb-2">Farm Logo / Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          {loading ? 'Registering...' : 'Register as Farmer'}
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}
