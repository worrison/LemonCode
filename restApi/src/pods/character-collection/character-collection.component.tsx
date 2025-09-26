import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchCharacters } from './character-collection.api';
import type { CharacterCollectionVm } from './character-collection.vm';


// Si ya tienes estos componentes en common, úsalo; si no, copia los que hay en este doc
const Pagination: React.FC<{ page: number; pages: number; onChange: (p: number) => void }> = ({ page, pages, onChange }) => {
if (pages <= 1) return null;
return (
<div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
<button disabled={page <= 1} onClick={() => onChange(page - 1)}>Anterior</button>
<span>Página {page} / {pages}</span>
<button disabled={page >= pages} onClick={() => onChange(page + 1)}>Siguiente</button>
</div>
);
};


const SearchBox: React.FC<{ defaultValue?: string; onSearch: (t: string) => void }> = ({ defaultValue = '', onSearch }) => {
const [text, setText] = useState(defaultValue);


// Pequeño debounce manual
useEffect(() => {
const id = setTimeout(() => onSearch(text.trim()), 350);
return () => clearTimeout(id);
}, [text]);


return (
<input
placeholder="Buscar por nombre..."
value={text}
onChange={e => setText(e.target.value)}
style={{ padding: 8, marginBottom: 12, width: '100%', maxWidth: 320 }}
/>
);
};


export const CharacterCollectionComponent: React.FC = () => {
const [sp, setSp] = useSearchParams();
const page = useMemo(() => Math.max(1, Number(sp.get('page') || 1)), [sp]);
const name = useMemo(() => sp.get('name') || '', [sp]);


const [items, setItems] = useState<Array<{
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}>>([]);
const [pages, setPages] = useState(1);
const [total, setTotal] = useState(0);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');


const load = async () => {
try {
setLoading(true);
setError('');
const data = await fetchCharacters(page, name);
setItems(
(data.results ?? []).map(d => ({
id: d.id,
name: d.name,
status: d.status,
species: d.species,
gender: d.gender,
image: d.image,
}))
);
setPages(data.info.pages ?? 1);
setTotal(data.info.count ?? 0);
} catch (e: any) {
// La API devuelve 404 cuando no hay resultados con ese filtro
if (e?.response?.status === 404) {
setItems([]);
setPages(1);
setTotal(0);
setError('No se han encontrado personajes con ese filtro');
} else {
setError(e?.message ?? 'Error cargando personajes');
}
} finally {
setLoading(false);
}
};


useEffect(() => { load(); }, [page, name]);


const onPage = (p: number) => {
setSp(prev => { prev.set('page', String(p)); return prev; }, { replace: true });
};


const onSearch = (term: string) => {
setSp(prev => {
term ? prev.set('name', term) : prev.delete('name');
prev.set('page', '1');
return prev;
}, { replace: true });
};


return (
<div style={{ padding: 16 }}>
<h1>Personajes</h1>
<SearchBox defaultValue={name} onSearch={onSearch} />


{loading && <p>Cargando...</p>}
{!loading && error && <p style={{ color: 'crimson' }}>{error}</p>}


<p>Total: {total}</p>


<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
{items.map(c => (
<Link key={c.id} to={`/character/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
<article style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
<img src={c.image} alt={c.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 6 }} />
<h3 style={{ margin: '8px 0 4px' }}>{c.name}</h3>
<small>{c.species} · {c.status}</small>
</article>
</Link>
))}
</div>


<Pagination page={page} pages={pages} onChange={onPage} />
</div>
);
};
