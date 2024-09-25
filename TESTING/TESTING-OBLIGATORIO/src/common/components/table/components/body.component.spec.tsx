import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BodyComponent } from './body.component';
import { Row } from 'react-table';

describe('common/table/BodyComponent', () => {
  it('should render as expected', () => {
    const props = {
      rows: ([
        { getRowProps: jest.fn(), original: { testRow: 1 }, id: 'row-1' },
        { getRowProps: jest.fn(), original: { testRow: 2 }, id: 'row-2' },
        { getRowProps: jest.fn(), original: { testRow: 3 }, id: 'row-3' },
      ] as unknown) as Row[],
      rowRenderer: (rowProps) => (
        <tr key={rowProps.row.id || rowProps.row.testRow}>
          <td>{rowProps.row.testRow}</td>
        </tr>
      ),
      prepareRow: jest.fn(),
    };

    const { getByText } = render(
      <table>
        <BodyComponent {...props} />
      </table>
    );

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });
});
