import React, { useState } from 'react';

function AccountSecurity() {
  const [formData, setFormData] = useState({
    username: 'royal_admin',
    password: '123456',
    confirmPassword: '123456',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      username: 'royal_admin',
      password: '123456',
      confirmPassword: '123456',
    });
    setIsEditing(false);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password, confirmPassword } = formData;

    // Validation: All fields required
    if (!username || !password || !confirmPassword) {
      setError('⚠️ Please fill all fields before saving.');
      return;
    }

    // Validation: Passwords match
    if (password !== confirmPassword) {
      setError('⚠️ Passwords do not match.');
      return;
    }

    setError('');
    setIsEditing(false);
    console.log('✅ Saved data:', formData);
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold mb-5">Account & Security</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block font-semibold mb-1">Username</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Change Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Show buttons only when editing */}
        {isEditing && (
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-[#5B63E5] rounded-md hover:bg-[#4f57eb]"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default AccountSecurity;
