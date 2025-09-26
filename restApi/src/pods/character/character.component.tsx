import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacter } from './character.api';
import { CharacterVm } from './character.vm';
import { bestSentenceService } from '../../core/services';


export const CharacterComponent: React.FC = () => {
const params = useParams();
const id = Number(params.id);
console.log('Character ID from params:', id, 'Raw params:', params);
const [c, setC] = useState<CharacterVm | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [bestSentence, setBestSentence] = useState('');
const [saved, setSaved] = useState(false);
const [saving, setSaving] = useState(false);
const [sentenceError, setSentenceError] = useState('');


const load = async () => {
try {
setLoading(true);
setError('');
console.log('Fetching character with ID:', id);
const data = await fetchCharacter(id);
console.log('Character data:', data);
setC(data);

// Cargar la frase guardada
await loadBestSentence();
} catch (e: any) {
console.error('Error fetching character:', e);
setError(e?.message ?? 'Error loading character');
setC(null);
} finally {
setLoading(false);
}
};

const loadBestSentence = async () => {
try {
const sentence = await bestSentenceService.getBestSentence(id);
setBestSentence(sentence);
} catch (error) {
console.error('Error loading best sentence:', error);
// No mostrar error aquí, es opcional
}
};


useEffect(() => {
  if (id && !isNaN(id)) {
    load();
  } else {
    setError('Invalid character ID');
  }
}, [id]);


const onSave = async () => {
if (!bestSentence.trim()) {
setSentenceError('Please enter a sentence');
return;
}

try {
setSaving(true);
setSentenceError('');
await bestSentenceService.saveBestSentence(id, bestSentence.trim());
setSaved(true);
setTimeout(() => setSaved(false), 2000);
} catch (error: any) {
console.error('Error saving best sentence:', error);
setSentenceError(error.message || 'Failed to save sentence');
} finally {
setSaving(false);
}
};

const onDelete = async () => {
if (!bestSentence.trim()) return;

if (!confirm('Are you sure you want to delete this sentence?')) {
return;
}

try {
setSaving(true);
setSentenceError('');
await bestSentenceService.deleteBestSentence(id);
setBestSentence('');
setSaved(false);
} catch (error: any) {
console.error('Error deleting best sentence:', error);
setSentenceError(error.message || 'Failed to delete sentence');
} finally {
setSaving(false);
}
};


if (loading) return <div style={{ padding: 16 }}><p>Loading...</p></div>;
if (error) return <div style={{ padding: 16 }}><p style={{ color: 'red' }}>Error: {error}</p><Link to="/">← Back to characters</Link></div>;
if (!c) return <div style={{ padding: 16 }}><p>Character not found</p><Link to="/">← Back to characters</Link></div>;


return (
<div style={{ padding: 16 }}>
<Link to="/">← Back</Link>
<h1>{c.name}</h1>
<img src={c.image} alt={c.name} style={{ width: 280, borderRadius: 8 }} />
<ul>
<li>Status: {c.status}</li>
<li>Species: {c.species}</li>
<li>Gender: {c.gender}</li>
<li>Origin: {c.origin?.name}</li>
<li>Location: {c.location?.name}</li>
</ul>


<section>
<h3>Best sentence</h3>
<textarea 
rows={3} 
value={bestSentence} 
onChange={e => setBestSentence(e.target.value)}
placeholder="Enter the best sentence from this character..."
style={{ width: '100%', padding: 8, marginBottom: 8 }}
disabled={saving}
/>
{sentenceError && <p style={{ color: 'red', margin: '4px 0' }}>{sentenceError}</p>}
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
<button onClick={onSave} disabled={saving || !bestSentence.trim()}>
{saving ? 'Saving...' : 'Save'}
</button>
{bestSentence.trim() && (
<button onClick={onDelete} disabled={saving} style={{ color: 'red' }}>
Delete
</button>
)}
{saved && <span style={{ color: 'green' }}>✓ Saved successfully</span>}
</div>
</section>
</div>
);
};
