/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateApplication = /* GraphQL */ `subscription OnCreateApplication(
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
` as GeneratedSubscription<
  APITypes.OnCreateApplicationSubscriptionVariables,
  APITypes.OnCreateApplicationSubscription
>;
export const onUpdateApplication = /* GraphQL */ `subscription OnUpdateApplication(
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
` as GeneratedSubscription<
  APITypes.OnUpdateApplicationSubscriptionVariables,
  APITypes.OnUpdateApplicationSubscription
>;
export const onDeleteApplication = /* GraphQL */ `subscription OnDeleteApplication(
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
` as GeneratedSubscription<
  APITypes.OnDeleteApplicationSubscriptionVariables,
  APITypes.OnDeleteApplicationSubscription
>;
export const onCreateExperience = /* GraphQL */ `subscription OnCreateExperience(
  $filter: ModelSubscriptionExperienceFilterInput
  $owner: String
) {
  onCreateExperience(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateExperienceSubscriptionVariables,
  APITypes.OnCreateExperienceSubscription
>;
export const onUpdateExperience = /* GraphQL */ `subscription OnUpdateExperience(
  $filter: ModelSubscriptionExperienceFilterInput
  $owner: String
) {
  onUpdateExperience(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateExperienceSubscriptionVariables,
  APITypes.OnUpdateExperienceSubscription
>;
export const onDeleteExperience = /* GraphQL */ `subscription OnDeleteExperience(
  $filter: ModelSubscriptionExperienceFilterInput
  $owner: String
) {
  onDeleteExperience(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteExperienceSubscriptionVariables,
  APITypes.OnDeleteExperienceSubscription
>;
export const onCreateEducation = /* GraphQL */ `subscription OnCreateEducation(
  $filter: ModelSubscriptionEducationFilterInput
  $owner: String
) {
  onCreateEducation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEducationSubscriptionVariables,
  APITypes.OnCreateEducationSubscription
>;
export const onUpdateEducation = /* GraphQL */ `subscription OnUpdateEducation(
  $filter: ModelSubscriptionEducationFilterInput
  $owner: String
) {
  onUpdateEducation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEducationSubscriptionVariables,
  APITypes.OnUpdateEducationSubscription
>;
export const onDeleteEducation = /* GraphQL */ `subscription OnDeleteEducation(
  $filter: ModelSubscriptionEducationFilterInput
  $owner: String
) {
  onDeleteEducation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEducationSubscriptionVariables,
  APITypes.OnDeleteEducationSubscription
>;
export const onCreateResume = /* GraphQL */ `subscription OnCreateResume(
  $filter: ModelSubscriptionResumeFilterInput
  $owner: String
) {
  onCreateResume(filter: $filter, owner: $owner) {
    id
    fullName
    email
    phoneNumber
    links
    bio
    skills
    employment {
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
    projects {
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
    education {
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
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateResumeSubscriptionVariables,
  APITypes.OnCreateResumeSubscription
>;
export const onUpdateResume = /* GraphQL */ `subscription OnUpdateResume(
  $filter: ModelSubscriptionResumeFilterInput
  $owner: String
) {
  onUpdateResume(filter: $filter, owner: $owner) {
    id
    fullName
    email
    phoneNumber
    links
    bio
    skills
    employment {
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
    projects {
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
    education {
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
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateResumeSubscriptionVariables,
  APITypes.OnUpdateResumeSubscription
>;
export const onDeleteResume = /* GraphQL */ `subscription OnDeleteResume(
  $filter: ModelSubscriptionResumeFilterInput
  $owner: String
) {
  onDeleteResume(filter: $filter, owner: $owner) {
    id
    fullName
    email
    phoneNumber
    links
    bio
    skills
    employment {
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
    projects {
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
    education {
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
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteResumeSubscriptionVariables,
  APITypes.OnDeleteResumeSubscription
>;
