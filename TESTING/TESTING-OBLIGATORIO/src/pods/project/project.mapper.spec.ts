import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('mapProjectFromApiToVm', () => {
  it('debería devolver un proyecto vacío cuando la entrada es nula', () => {
    // Arrange
    const project: apiModel.Project = null;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('debería devolver un proyecto vacío cuando la entrada es indefinida', () => {
    // Arrange
    const project: apiModel.Project = undefined;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('debería mapear el proyecto del modelo de API al ViewModel', () => {
    // Arrange
    const apiProject: apiModel.Project = {
      id: '1',
      name: 'Test Project',
      externalId: '123',
      comments: 'Test Comments',
      isActive: true,
      employees: [
        { id: '1', employeeName: 'John Doe' },
        { id: '2', employeeName: 'Jane Smith' },
      ],
    };

    const expectedVmProject: viewModel.Project = {
      id: '1',
      name: 'Test Project',
      externalId: '123',
      comments: 'Test Comments',
      isActive: true,
      employees: [
        { id: '1', employeeName: 'John Doe' },
        { id: '2', employeeName: 'Jane Smith' },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(apiProject);

    // Assert
    expect(result).toEqual(expectedVmProject);
  });

  it('should map employee list correctly from API to ViewModel', () => {
    // Arrange
    const apiProject: apiModel.Project = {
      id: '1',
      name: 'Test Project',
      externalId: '123',
      comments: 'Test Comments',
      isActive: true,
      employees: [
        { id: '1', employeeName: 'John Doe' },
        { id: '2', employeeName: 'Jane Smith' },
      ],
    };

    const expectedEmployees: viewModel.EmployeeSummary[] = [
      { id: '1', employeeName: 'John Doe' },
      { id: '2', employeeName: 'Jane Smith' },
    ];

    // Act
    const result = mapProjectFromApiToVm(apiProject);

    // Assert
    expect(result.employees).toEqual(expectedEmployees);
  });
});
