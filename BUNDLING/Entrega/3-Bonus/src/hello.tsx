import { FC } from 'react';
export const Hello: FC = () =>{
    return <div>
        <h2>Hello from React</h2>
        <p>React is working</p>
        <p>API_BASE: {import.meta.env.VITE_API_BASE}</p>
        </div>;
}