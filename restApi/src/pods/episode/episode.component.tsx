import React, { useEffect, useState } from 'react';
import { fetchEpisode } from './episode.api';


type Props = { id: number };


export const EpisodeComponent: React.FC<Props> = ({ id }) => {
const [e, setE] = useState<any>();
useEffect(() => { fetchEpisode(id).then(setE); }, [id]);
if (!e) return null;
return (
<div>
<h4>Episode {e.id}: {e.name}</h4>
<p>Air date: {e.air_date}</p>
<p>Code: {e.episode}</p>
</div>
);
};
