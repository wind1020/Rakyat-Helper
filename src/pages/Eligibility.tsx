import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { setProfile, getProfile } from '../storage';
import type { Profile } from '../storage';

const STATES = [
  'Selangor', 'Kuala Lumpur', 'Johor', 'Penang', 'Perak', 'Sabah', 'Sarawak',
  'Kedah', 'Negeri Sembilan', 'Melaka', 'Pahang', 'Terengganu', 'Kelantan', 'Perlis',
];

export default function Eligibility() {
  const navigate = useNavigate();
  const existing = getProfile();
  const [form, setForm] = useState<Profile>(
    existing || {
      name: '',
      age: 0,
      occupation: '',
      maritalStatus: 'Single',
      ethnic: 'Malay',
      religion: 'Islam',
      state: 'Selangor',
      income: 0,
      situation: '',
    }
  );
  const [error, setError] = useState('');

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.age || form.age < 1 || form.age > 120) {
      setError('Enter a valid age.');
      return;
    }
    if (!form.occupation.trim()) {
      setError('Occupation is required.');
      return;
    }
    setError('');
    setProfile({ ...form, name: form.name || 'Citizen' });
    navigate('/recommendations');
  }

  return (
    <Layout title="Eligibility Profile" back>
      <form onSubmit={handleSubmit} className="card">
        <h3 style={{ margin: '0 0 4px' }}>Financial Information</h3>
        <p style={{ fontSize: 13, color: '#444653', marginBottom: 16 }}>
          Provide accurate details to determine your eligibility for national aid programs.
        </p>

        <div className="field">
          <label>Full Name</label>
          <input value={form.name} onChange={(e) => update('name', e.target.value)} />
        </div>

        <div className="field">
          <label>Age</label>
          <input
            type="number"
            placeholder="Enter your age"
            value={form.age || ''}
            onChange={(e) => update('age', Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label>Occupation</label>
          <input
            placeholder="e.g. Teacher, Engineer"
            value={form.occupation}
            onChange={(e) => update('occupation', e.target.value)}
          />
        </div>

        <div className="field">
          <label>Marital Status</label>
          <select value={form.maritalStatus} onChange={(e) => update('maritalStatus', e.target.value)}>
            {['Single', 'Married', 'Divorced', 'Widowed'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Ethnic</label>
          <select value={form.ethnic} onChange={(e) => update('ethnic', e.target.value)}>
            {['Malay', 'Chinese', 'Indian', 'Other'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Religion</label>
          <select value={form.religion} onChange={(e) => update('religion', e.target.value)}>
            {['Islam', 'Buddhism', 'Christianity', 'Hinduism', 'Other'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>State</label>
          <select value={form.state} onChange={(e) => update('state', e.target.value)}>
            {STATES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Monthly Income (MYR)</label>
          <input
            type="number"
            placeholder="RM 0.00"
            value={form.income || ''}
            onChange={(e) => update('income', Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label>Describe your situation</label>
          <textarea
            rows={3}
            placeholder="Tell us more about your current financial or living situation..."
            value={form.situation}
            onChange={(e) => update('situation', e.target.value)}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="primary-btn">
          Find Aid
        </button>
      </form>
    </Layout>
  );
}
