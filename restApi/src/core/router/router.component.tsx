import React from 'react';
import { HashRouter, Routes, Route, Navigate,createBrowserRouter, RouterProvider } from 'react-router-dom';
import { switchRoutes } from './routes';
import { CharacterCollectionScene } from '../../scenes/character-collection.scene';
import { CharacterScene } from '../../scenes/character.scene';

export const RouterComponent: React.FunctionComponent = () => {
  console.log('Router component rendering with routes:', switchRoutes);

  return (
    <HashRouter>
      <Routes>
        <Route
          path={switchRoutes.characterCollection}
          element={<CharacterCollectionScene />}
        />
        <Route
          path={switchRoutes.character}
          element={<CharacterScene />}
        />
        <Route
          path={switchRoutes.root}
          element={<Navigate to={switchRoutes.characterCollection} />}
        />
      </Routes>
    </HashRouter>
  );
};
