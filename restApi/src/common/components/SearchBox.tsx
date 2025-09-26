import React, { useState } from 'react';


type Props = { defaultValue?: string; onSearch: (term: string) => void };


export const SearchBox: React.FC<Props> = ({ defaultValue = '', onSearch }) => {
const [text, setText] = useState(defaultValue);
return (
<form onSubmit={e => { e.preventDefault(); onSearch(text.trim()); }}>
<input
placeholder="Search by name..."
value={text}
onChange={e => setText(e.target.value)}
/>
<button type="submit">Search</button>
</form>
);
};
