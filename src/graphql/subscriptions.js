/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
    $owner: String
  ) {
    onCreateApplication(filter: $filter, owner: $owner) {
      id
      company
      role
      date_applied
      response
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
    $owner: String
  ) {
    onUpdateApplication(filter: $filter, owner: $owner) {
      id
      company
      role
      date_applied
      response
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication(
    $filter: ModelSubscriptionApplicationFilterInput
    $owner: String
  ) {
    onDeleteApplication(filter: $filter, owner: $owner) {
      id
      company
      role
      date_applied
      response
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
