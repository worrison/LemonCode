import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { usePromiseTracker } from 'react-promise-tracker';
import { SpinnerComponent } from './spinner.component';

// Mock de la librería react-promise-tracker para evitar errores en las pruebas
// ya que no se puede renderizar el componente SpinnerComponent sin el hook usePromiseTracker
//lo que hace es retornar un objeto con una propiedad promiseInProgress para simular una promesa en progreso

jest.mock('react-promise-tracker', () => ({
  usePromiseTracker: jest.fn(),
}));

describe('SpinnerComponent', () => {
  it('Renderizado del spinner', () => {
    // Arrange
    (usePromiseTracker as jest.Mock).mockReturnValue({ promiseInProgress: true });
    render(<SpinnerComponent />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('no renderiza el spinner si no hay promesas en ejecucion', () => {
    (usePromiseTracker as jest.Mock).mockReturnValue({ promiseInProgress: false });
    render(<SpinnerComponent />);
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
