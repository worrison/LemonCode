import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacter } from './character.api';
import { CharacterVm } from './character.vm';


export const CharacterComponent: React.FC = () => {
const params = useParams();
const id = Number(params.id);
console.log('Character ID from params:', id, 'Raw params:', params);
const [c, setC] = useState<CharacterVm | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [bestSentence, setBestSentence] = useState('');
const [saved, setSaved] = useState(false);


const load = async () => {
try {
setLoading(true);
setError('');
console.log('Fetching character with ID:', id);
const data = await fetchCharacter(id);
console.log('Character data:', data);
setC(data);
} catch (e: any) {
console.error('Error fetching character:', e);
setError(e?.message ?? 'Error loading character');
setC(null);
} finally {
setLoading(false);
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
try {
setSaved(true);
setTimeout(() => setSaved(false), 1500);
} catch (e) {
// ignore
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
<textarea rows={3} value={bestSentence} onChange={e => setBestSentence(e.target.value)} />
<div>
<button onClick={onSave}>Save</button>
{saved && <span style={{ marginLeft: 8 }}>✓ Saved</span>}
</div>
</section>
</div>
);
};
