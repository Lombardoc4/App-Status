/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createApplication = /* GraphQL */ `mutation CreateApplication(
  $input: CreateApplicationInput!
  $condition: ModelApplicationConditionInput
) {
  createApplication(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApplicationMutationVariables,
  APITypes.CreateApplicationMutation
>;
export const updateApplication = /* GraphQL */ `mutation UpdateApplication(
  $input: UpdateApplicationInput!
  $condition: ModelApplicationConditionInput
) {
  updateApplication(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApplicationMutationVariables,
  APITypes.UpdateApplicationMutation
>;
export const deleteApplication = /* GraphQL */ `mutation DeleteApplication(
  $input: DeleteApplicationInput!
  $condition: ModelApplicationConditionInput
) {
  deleteApplication(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApplicationMutationVariables,
  APITypes.DeleteApplicationMutation
>;
export const createExperience = /* GraphQL */ `mutation CreateExperience(
  $input: CreateExperienceInput!
  $condition: ModelExperienceConditionInput
) {
  createExperience(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateExperienceMutationVariables,
  APITypes.CreateExperienceMutation
>;
export const updateExperience = /* GraphQL */ `mutation UpdateExperience(
  $input: UpdateExperienceInput!
  $condition: ModelExperienceConditionInput
) {
  updateExperience(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateExperienceMutationVariables,
  APITypes.UpdateExperienceMutation
>;
export const deleteExperience = /* GraphQL */ `mutation DeleteExperience(
  $input: DeleteExperienceInput!
  $condition: ModelExperienceConditionInput
) {
  deleteExperience(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteExperienceMutationVariables,
  APITypes.DeleteExperienceMutation
>;
export const createEducation = /* GraphQL */ `mutation CreateEducation(
  $input: CreateEducationInput!
  $condition: ModelEducationConditionInput
) {
  createEducation(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateEducationMutationVariables,
  APITypes.CreateEducationMutation
>;
export const updateEducation = /* GraphQL */ `mutation UpdateEducation(
  $input: UpdateEducationInput!
  $condition: ModelEducationConditionInput
) {
  updateEducation(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateEducationMutationVariables,
  APITypes.UpdateEducationMutation
>;
export const deleteEducation = /* GraphQL */ `mutation DeleteEducation(
  $input: DeleteEducationInput!
  $condition: ModelEducationConditionInput
) {
  deleteEducation(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteEducationMutationVariables,
  APITypes.DeleteEducationMutation
>;
export const createResume = /* GraphQL */ `mutation CreateResume(
  $input: CreateResumeInput!
  $condition: ModelResumeConditionInput
) {
  createResume(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateResumeMutationVariables,
  APITypes.CreateResumeMutation
>;
export const updateResume = /* GraphQL */ `mutation UpdateResume(
  $input: UpdateResumeInput!
  $condition: ModelResumeConditionInput
) {
  updateResume(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateResumeMutationVariables,
  APITypes.UpdateResumeMutation
>;
export const deleteResume = /* GraphQL */ `mutation DeleteResume(
  $input: DeleteResumeInput!
  $condition: ModelResumeConditionInput
) {
  deleteResume(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteResumeMutationVariables,
  APITypes.DeleteResumeMutation
>;
