// Constants for SA Crime Data

export const URIS = {
  dataDomain: 'https://data.sa.gov.au/data/api/3/action/datastore_search?resource_id=590083cd-be2f-4a6c-871e-0ec4c717717b',
  proxyDomain: 'https://nsr-cors.herokuapp.com/'
}

export const FILTERS = {
  primaryFilter: 'Suburb - Incident',
  secondaryFilter: 'Offence Level 2 Description',
  idKey: 'id'
}

export const COPY = {
  loading: 'Sourcing reports ...',
  pageTitle: 'Crime data from SA Police',
  primaryToggle: 'suburb',
  secondaryToggle: 'offence',
  tableCaption: 'Crimes in South Australia'
}