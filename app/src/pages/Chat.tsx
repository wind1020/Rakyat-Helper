import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getProfile, getSavedIds } from '../storage';
import { matchPrograms, PROGRAMS } from '../data/programs';

type Message = { from: 'bot' | 'user'; text: string };

function buildReply(question: string): string {
  const profile = getProfile();
  const q = question.toLowerCase();

  if (!profile) {
    return "I don't have your eligibility profile yet. Please fill in the Eligibility tab first so I can give you accurate answers based on your income, age, and state.";
  }

  const matches = matchPrograms(profile);

  const mentioned = PROGRAMS.find((p) => q.includes(p.name.toLowerCase().split(' ')[0].toLowerCase()));
  if (mentioned) {
    const eligible = matches.some((m) => m.id === mentioned.id);
    return eligible
      ? `Based on your profile (income RM${profile.income}, age ${profile.age}, ${profile.state}), you ARE eligible for ${mentioned.name}. ${mentioned.description} Potential benefit: ${mentioned.amount}.`
      : `Based on your profile (income RM${profile.income}, age ${profile.age}, ${profile.state}), you do NOT currently meet the income/age threshold for ${mentioned.name} (max income RM${mentioned.maxIncome}).`;
  }

  if (q.includes('eligible') || q.includes('qualify')) {
    if (matches.length === 0) {
      return "Based on your current profile, you don't qualify for any listed programs yet. Try updating your Eligibility Profile if your situation has changed.";
    }
    return `You currently qualify for ${matches.length} program(s): ${matches
      .map((m) => m.name)
      .join(', ')}. Check the Eligibility tab's results for details.`;
  }

  return "I can check your eligibility for specific programs like 'Bantuan Sara Hidup' or 'STR 2024', or tell you what you qualify for overall — just ask!";
}

export default function Chat() {
  const profile = getProfile();
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      text: `Selamat datang${profile ? `, ${profile.name}` : ''}! I'm your Rakyat Helper AI. How can I assist you today with government aid or citizen services?`,
    },
  ]);
  const [input, setInput] = useState('');

  function send() {
    if (!input.trim()) return;
    const userMsg: Message = { from: 'user', text: input };
    const reply: Message = { from: 'bot', text: buildReply(input) };
    setMessages((m) => [...m, userMsg, reply]);
    setInput('');
  }

  return (
    <Layout title="Rakyat Helper AI Assistant" back>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
              background: m.from === 'user' ? '#fff' : '#f1ecf2',
              border: m.from === 'user' ? '1.5px solid #0032a0' : 'none',
              color: m.from === 'user' ? '#00206e' : '#1c1b1f',
              borderRadius: 10,
              padding: '10px 12px',
              maxWidth: '85%',
              fontSize: 14,
            }}
          >
            {m.text}
          </div>
        ))}

        <div
          style={{
            alignSelf: 'flex-start',
            maxWidth: '85%',
            background: '#fff8e1',
            border: '1.5px solid var(--gold)',
            borderRadius: 10,
            padding: '10px 12px',
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, color: '#6f5400', margin: '0 0 4px' }}>
            AI SMART SUGGESTION
          </p>
          <p style={{ fontSize: 14, margin: '0 0 8px' }}>
            You have {getSavedIds().length} saved aid program{getSavedIds().length === 1 ? '' : 's'}. Do you
            want to review them?
          </p>
          <Link to="/saved">
            <button className="primary-btn" style={{ padding: '8px 14px', width: 'auto', fontSize: 13 }}>
              Review Saved Aid
            </button>
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {['Check eligibility', 'Am I eligible for STR?', 'Apply for PPR Housing'].map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            style={{
              border: '1px solid #c4c5d5',
              background: '#fff',
              borderRadius: 999,
              padding: '6px 12px',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div style={{ position: 'sticky', bottom: 70, display: 'flex', gap: 8 }}>
        <input
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 999,
            border: '1px solid #c4c5d5',
          }}
          placeholder="Ask me about Bantuan Sara Hidup..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button
          onClick={send}
          style={{
            background: '#00206e',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 44,
            height: 44,
            cursor: 'pointer',
          }}
        >
          ➤
        </button>
      </div>
    </Layout>
  );
}
