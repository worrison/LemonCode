import React from 'react';


type Props = { page: number; pages: number; onChange: (p: number) => void };


export const Pagination: React.FC<Props> = ({ page, pages, onChange }) => {
if (pages <= 1) return null;
const prevDisabled = page <= 1;
const nextDisabled = page >= pages;
return (
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
<button disabled={prevDisabled} onClick={() => onChange(page - 1)}>Prev</button>
<span>Page {page} / {pages}</span>
<button disabled={nextDisabled} onClick={() => onChange(page + 1)}>Next</button>
</div>
);
};
