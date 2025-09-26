import React, { useEffect, useState } from 'react';
import { fetchLocation } from './location.api';


type Props = { id: number };


export const LocationComponent: React.FC<Props> = ({ id }) => {
const [l, setL] = useState<any>();
useEffect(() => { fetchLocation(id).then(setL); }, [id]);
if (!l) return null;
return (
<div>
<h4>Location {l.id}: {l.name}</h4>
<p>Type: {l.type}</p>
<p>Dimension: {l.dimension}</p>
</div>
);
};
