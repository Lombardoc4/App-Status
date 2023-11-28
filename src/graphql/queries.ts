/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getApplication = /* GraphQL */ `query GetApplication($id: ID!) {
  getApplication(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetApplicationQueryVariables,
  APITypes.GetApplicationQuery
>;
export const listApplications = /* GraphQL */ `query ListApplications(
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApplicationsQueryVariables,
  APITypes.ListApplicationsQuery
>;
export const getExperience = /* GraphQL */ `query GetExperience($id: ID!) {
  getExperience(id: $id) {
    id
    company
    role
    start_date
    end_date
    description
    createdAt
    updatedAt
    resumeEmploymentId
    resumeProjectsId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetExperienceQueryVariables,
  APITypes.GetExperienceQuery
>;
export const listExperiences = /* GraphQL */ `query ListExperiences(
  $filter: ModelExperienceFilterInput
  $limit: Int
  $nextToken: String
) {
  listExperiences(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      company
      role
      start_date
      end_date
      description
      createdAt
      updatedAt
      resumeEmploymentId
      resumeProjectsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListExperiencesQueryVariables,
  APITypes.ListExperiencesQuery
>;
export const getEducation = /* GraphQL */ `query GetEducation($id: ID!) {
  getEducation(id: $id) {
    id
    school
    tier
    completion
    createdAt
    updatedAt
    resumeEducationId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetEducationQueryVariables,
  APITypes.GetEducationQuery
>;
export const listEducations = /* GraphQL */ `query ListEducations(
  $filter: ModelEducationFilterInput
  $limit: Int
  $nextToken: String
) {
  listEducations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      school
      tier
      completion
      createdAt
      updatedAt
      resumeEducationId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEducationsQueryVariables,
  APITypes.ListEducationsQuery
>;
export const getResume = /* GraphQL */ `query GetResume($id: ID!) {
  getResume(id: $id) {
    id
    fullName
    email
    phoneNumber
    links
    bio
    skills
    employment {
      nextToken
      __typename
    }
    projects {
      nextToken
      __typename
    }
    education {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetResumeQueryVariables, APITypes.GetResumeQuery>;
export const listResumes = /* GraphQL */ `query ListResumes(
  $filter: ModelResumeFilterInput
  $limit: Int
  $nextToken: String
) {
  listResumes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      fullName
      email
      phoneNumber
      links
      bio
      skills
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListResumesQueryVariables,
  APITypes.ListResumesQuery
>;
