export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum ResponseMessages {
  PROVINCIAS_FETCHED_SUCCESSFULLY = 'Provincias fetched successfully',
  USERS_FETCHED_SUCCESSFULLY = 'Users fetched successfully',
  ERROR_FETCHING_PROVINCIAS = 'Error fetching provincias',
  ERROR_FETCHING_USERS = 'Error fetching users',
  CANTONES_FETCHED_SUCCESSFULLY = 'Cantones fetched successfully',
  CANTONES_BY_PROVINCIA_FETCHED_SUCCESSFULLY = 'Cantones by provincia fetched successfully',
  DISTRITOS_FETCHED_SUCCESSFULLY = 'Distritos fetched successfully',
  DISTRITOS_BY_CANTON_FETCHED_SUCCESSFULLY = 'Distritos by canton fetched successfully',
  ROUTE_NOT_FOUND = 'The requested route was not found',
  INTERNAL_SERVER_ERROR = 'An internal server error occurred',
}
