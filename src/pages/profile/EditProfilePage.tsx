import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, X } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../design-system/components/Toast';
import { Input } from '../../design-system/components/Input';
import { RadioGroup } from '../../design-system/components/RadioGroup';
import { Button } from '../../design-system/components/Button';
import { cn } from '../../lib/utils';

export function EditProfilePage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUser();
  const { showToast } = useToast();

  const [name, setName] = useState(profile?.name || '');
  const [age, setAge] = useState(profile?.age?.toString() || '');
  const [gender, setGender] = useState(profile?.gender || '');
  const [photos, setPhotos] = useState<string[]>(profile?.photos || []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!profile) return null;

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!age) newErrors.age = 'Age is required';
    else if (parseInt(age) < 18) newErrors.age = 'Must be 18 or older';
    else if (parseInt(age) > 100) newErrors.age = 'Please enter a valid age';
    if (!gender) newErrors.gender = 'Please select your gender';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    updateProfile({
      name: name.trim(),
      age: parseInt(age),
      gender,
      photos
    });

    showToast('Profile updated successfully!', 'success');
    navigate(-1);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (photos.length >= 6) {
        showToast('Maximum 6 photos allowed', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Edit Profile</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Photos Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Photos
          </label>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white shadow-md hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {photos.length < 6 && (
              <label className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                <Camera className="h-6 w-6 text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">Add</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  multiple
                />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Add up to 6 photos. First photo will be your main profile picture.
          </p>
        </div>

        {/* Name */}
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="Your name"
        />

        {/* Age */}
        <Input
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          error={errors.age}
          placeholder="Your age"
          min={18}
          max={100}
        />

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gender
          </label>
          <RadioGroup
            options={genderOptions}
            value={gender}
            onChange={setGender}
          />
          {errors.gender && (
            <p className="text-sm text-red-500 mt-2">{errors.gender}</p>
          )}
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button fullWidth size="lg" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  );
}
