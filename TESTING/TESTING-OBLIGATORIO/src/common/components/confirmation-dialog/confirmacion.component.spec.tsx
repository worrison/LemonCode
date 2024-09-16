import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ConfirmationDialogComponent } from './confirmation-dialog.component'; // Asegúrate de que la ruta sea correcta

describe('ConfirmationDialogComponent', () => {
  const defaultProps = {
    isOpen: true,
    onAccept: jest.fn(),
    onClose: jest.fn(),
    title: 'Confirmation',
    labels: {
      closeButton: 'Cancel',
      acceptButton: 'Accept',
    },
    children: <div>¿Estás seguro de que deseas continuar?</div>,
  };

  it('debería renderizar el diálogo con el título y los hijos proporcionados', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    expect(screen.getByText('Confirmation')).toBeInTheDocument();
    expect(screen.getByText('¿Estás seguro de que deseas continuar?')).toBeInTheDocument();
  });

  it('debería llamar a onClose cuando se haga clic en el botón de cerrar', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('debería llamar a onAccept cuando se haga clic en el botón de aceptar', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    const acceptButton = screen.getByText('Accept');
    fireEvent.click(acceptButton);

    expect(defaultProps.onAccept).toHaveBeenCalledTimes(1);
  });

  it('no debería renderizar el diálogo cuando isOpen es falso', () => {
    render(<ConfirmationDialogComponent {...defaultProps} isOpen={false} />);

    const dialog = screen.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument();
  });
});
