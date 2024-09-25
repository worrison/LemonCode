import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RowComponent } from './row.component';

describe('common/table/RowComponent', () => {
  it('should render as expected passing required properties', () => {
    // Arrange
    const props = {
      className: 'test-className',
      'data-testid': 'test-row',
    };

   // Act
   const { getByText, getByTestId } = render(
    <table>
      <tbody>
        <RowComponent {...props}>
          <td>{'Test rowData1'}</td>
        </RowComponent>
      </tbody>
    </table>
  );

    // Assert
    expect(getByTestId(props['data-testid'])).toHaveClass(props.className);
    expect(getByText('Test rowData1')).toBeInTheDocument();
  });

  it('should render a row component with two cells', () => {
    // Arrange
    const props = {
      className: 'test-className',
    };

 // Act
 const { getByText, getByTestId } = render(
  <table>
    <tbody>
      <RowComponent {...props}>
        <td>{'Test rowData2'}</td>
      </RowComponent>
    </tbody>
  </table>
);

    // Assert
    expect(getByText('Test rowData2')).toBeInTheDocument();
    expect(getByText('Test rowData2')).toBeInTheDocument();
  });
});
