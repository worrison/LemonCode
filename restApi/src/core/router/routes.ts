import { generatePath } from 'react-router';
import { Character } from '../models/character';

interface SwitchRoutes {
  character: string;
  characterCollection: string;
  root: string;
}

export const switchRoutes: SwitchRoutes = {
  root: '/',
  characterCollection: '/',
  character: '/character/:id'
};

type NavigationFunction = (id: string) => string;

interface LinkRoutes extends Omit<SwitchRoutes, 'character'> {
  character: NavigationFunction;
  characterCollection: string;
  root: string;
}

export const linkRoutes: LinkRoutes = {
  root: switchRoutes.root,
  characterCollection: switchRoutes.characterCollection,
  character: (id) => generatePath(switchRoutes.character, { id }),
};
