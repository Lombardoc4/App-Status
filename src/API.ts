/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateApplicationInput = {
  id?: string | null,
  company: string,
  role: string,
  date_applied: string,
  response?: ResponseValues | null,
};

export enum ResponseValues {
  WAITING = "WAITING",
  DECLINED = "DECLINED",
  ACCEPTED = "ACCEPTED",
  NO_ANSWER = "NO_ANSWER",
}


export type ModelApplicationConditionInput = {
  company?: ModelStringInput | null,
  role?: ModelStringInput | null,
  date_applied?: ModelStringInput | null,
  response?: ModelResponseValuesInput | null,
  and?: Array< ModelApplicationConditionInput | null > | null,
  or?: Array< ModelApplicationConditionInput | null > | null,
  not?: ModelApplicationConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelResponseValuesInput = {
  eq?: ResponseValues | null,
  ne?: ResponseValues | null,
};

export type Application = {
  __typename: "Application",
  id: string,
  company: string,
  role: string,
  date_applied: string,
  response?: ResponseValues | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateApplicationInput = {
  id: string,
  company?: string | null,
  role?: string | null,
  date_applied?: string | null,
  response?: ResponseValues | null,
};

export type DeleteApplicationInput = {
  id: string,
};

export type CreateExperienceInput = {
  id?: string | null,
  company: string,
  role: string,
  start_date: string,
  end_date?: string | null,
  description: Array< string | null >,
  resumeEmploymentId: string,
  resumeProjectsId: string,
};

export type ModelExperienceConditionInput = {
  company?: ModelStringInput | null,
  role?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  end_date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelExperienceConditionInput | null > | null,
  or?: Array< ModelExperienceConditionInput | null > | null,
  not?: ModelExperienceConditionInput | null,
  resumeEmploymentId?: ModelIDInput | null,
  resumeProjectsId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Experience = {
  __typename: "Experience",
  id: string,
  company: string,
  role: string,
  start_date: string,
  end_date?: string | null,
  description: Array< string | null >,
  createdAt: string,
  updatedAt: string,
  resumeEmploymentId: string,
  resumeProjectsId: string,
  owner?: string | null,
};

export type UpdateExperienceInput = {
  id: string,
  company?: string | null,
  role?: string | null,
  start_date?: string | null,
  end_date?: string | null,
  description?: Array< string | null > | null,
  resumeEmploymentId?: string | null,
  resumeProjectsId?: string | null,
};

export type DeleteExperienceInput = {
  id: string,
};

export type CreateEducationInput = {
  id?: string | null,
  school: string,
  tier: EducationTiers,
  completion: string,
  resumeEducationId?: string | null,
};

export enum EducationTiers {
  ASSOCIATES = "ASSOCIATES",
  BACHELORS = "BACHELORS",
  MASTERS = "MASTERS",
  DOCTORATE = "DOCTORATE",
}


export type ModelEducationConditionInput = {
  school?: ModelStringInput | null,
  tier?: ModelEducationTiersInput | null,
  completion?: ModelStringInput | null,
  and?: Array< ModelEducationConditionInput | null > | null,
  or?: Array< ModelEducationConditionInput | null > | null,
  not?: ModelEducationConditionInput | null,
  resumeEducationId?: ModelIDInput | null,
};

export type ModelEducationTiersInput = {
  eq?: EducationTiers | null,
  ne?: EducationTiers | null,
};

export type Education = {
  __typename: "Education",
  id: string,
  school: string,
  tier: EducationTiers,
  completion: string,
  createdAt: string,
  updatedAt: string,
  resumeEducationId?: string | null,
  owner?: string | null,
};

export type UpdateEducationInput = {
  id: string,
  school?: string | null,
  tier?: EducationTiers | null,
  completion?: string | null,
  resumeEducationId?: string | null,
};

export type DeleteEducationInput = {
  id: string,
};

export type CreateResumeInput = {
  id?: string | null,
  fullName: string,
  email: string,
  phoneNumber: string,
  links: string,
  bio: string,
  skills: Array< string | null >,
};

export type ModelResumeConditionInput = {
  fullName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  links?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  and?: Array< ModelResumeConditionInput | null > | null,
  or?: Array< ModelResumeConditionInput | null > | null,
  not?: ModelResumeConditionInput | null,
};

export type Resume = {
  __typename: "Resume",
  id: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  links: string,
  bio: string,
  skills: Array< string | null >,
  employment?: ModelExperienceConnection | null,
  projects?: ModelExperienceConnection | null,
  education?: ModelEducationConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelExperienceConnection = {
  __typename: "ModelExperienceConnection",
  items:  Array<Experience | null >,
  nextToken?: string | null,
};

export type ModelEducationConnection = {
  __typename: "ModelEducationConnection",
  items:  Array<Education | null >,
  nextToken?: string | null,
};

export type UpdateResumeInput = {
  id: string,
  fullName?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  links?: string | null,
  bio?: string | null,
  skills?: Array< string | null > | null,
};

export type DeleteResumeInput = {
  id: string,
};

export type ModelApplicationFilterInput = {
  id?: ModelIDInput | null,
  company?: ModelStringInput | null,
  role?: ModelStringInput | null,
  date_applied?: ModelStringInput | null,
  response?: ModelResponseValuesInput | null,
  and?: Array< ModelApplicationFilterInput | null > | null,
  or?: Array< ModelApplicationFilterInput | null > | null,
  not?: ModelApplicationFilterInput | null,
};

export type ModelApplicationConnection = {
  __typename: "ModelApplicationConnection",
  items:  Array<Application | null >,
  nextToken?: string | null,
};

export type ModelExperienceFilterInput = {
  id?: ModelIDInput | null,
  company?: ModelStringInput | null,
  role?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  end_date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelExperienceFilterInput | null > | null,
  or?: Array< ModelExperienceFilterInput | null > | null,
  not?: ModelExperienceFilterInput | null,
  resumeEmploymentId?: ModelIDInput | null,
  resumeProjectsId?: ModelIDInput | null,
};

export type ModelEducationFilterInput = {
  id?: ModelIDInput | null,
  school?: ModelStringInput | null,
  tier?: ModelEducationTiersInput | null,
  completion?: ModelStringInput | null,
  and?: Array< ModelEducationFilterInput | null > | null,
  or?: Array< ModelEducationFilterInput | null > | null,
  not?: ModelEducationFilterInput | null,
  resumeEducationId?: ModelIDInput | null,
};

export type ModelResumeFilterInput = {
  id?: ModelIDInput | null,
  fullName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  links?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  and?: Array< ModelResumeFilterInput | null > | null,
  or?: Array< ModelResumeFilterInput | null > | null,
  not?: ModelResumeFilterInput | null,
};

export type ModelResumeConnection = {
  __typename: "ModelResumeConnection",
  items:  Array<Resume | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionApplicationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  company?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  date_applied?: ModelSubscriptionStringInput | null,
  response?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApplicationFilterInput | null > | null,
  or?: Array< ModelSubscriptionApplicationFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionExperienceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  company?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  start_date?: ModelSubscriptionStringInput | null,
  end_date?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionExperienceFilterInput | null > | null,
  or?: Array< ModelSubscriptionExperienceFilterInput | null > | null,
};

export type ModelSubscriptionEducationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  school?: ModelSubscriptionStringInput | null,
  tier?: ModelSubscriptionStringInput | null,
  completion?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEducationFilterInput | null > | null,
  or?: Array< ModelSubscriptionEducationFilterInput | null > | null,
};

export type ModelSubscriptionResumeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  fullName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  links?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  skills?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionResumeFilterInput | null > | null,
  or?: Array< ModelSubscriptionResumeFilterInput | null > | null,
};

export type CreateApplicationMutationVariables = {
  input: CreateApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type CreateApplicationMutation = {
  createApplication?:  {
    __typename: "Application",
    id: string,
    company: string,
    role: string,
    date_applied: string,
    response?: ResponseValues | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateApplicationMutationVariables = {
  input: UpdateApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type UpdateApplicationMutation = {
  updateApplication?:  {
    __typename: "Application",
    id: string,
    company: string,
    role: string,
    date_applied: string,
    response?: ResponseValues | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteApplicationMutationVariables = {
  input: DeleteApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type DeleteApplicationMutation = {
  deleteApplication?:  {
    __typename: "Application",
    id: string,
    company: string,
    role: string,
    date_applied: string,
    response?: ResponseValues | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateExperienceMutationVariables = {
  input: CreateExperienceInput,
  condition?: ModelExperienceConditionInput | null,
};

export type CreateExperienceMutation = {
  createExperience?:  {
    __typename: "Experience",
    id: string,
    company: string,
    role: string,
    start_date: string,
    end_date?: string | null,
    description: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    resumeEmploymentId: string,
    resumeProjectsId: string,
    owner?: string | null,
  } | null,
};

export type UpdateExperienceMutationVariables = {
  input: UpdateExperienceInput,
  condition?: ModelExperienceConditionInput | null,
};

export type UpdateExperienceMutation = {
  updateExperience?:  {
    __typename: "Experience",
    id: string,
    company: string,
    role: string,
    start_date: string,
    end_date?: string | null,
    description: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    resumeEmploymentId: string,
    resumeProjectsId: string,
    owner?: string | null,
  } | null,
};

export type DeleteExperienceMutationVariables = {
  input: DeleteExperienceInput,
  condition?: ModelExperienceConditionInput | null,
};

export type DeleteExperienceMutation = {
  deleteExperience?:  {
    __typename: "Experience",
    id: string,
    company: string,
    role: string,
    start_date: string,
    end_date?: string | null,
    description: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    resumeEmploymentId: string,
    resumeProjectsId: string,
    owner?: string | null,
  } | null,
};

export type CreateEducationMutationVariables = {
  input: CreateEducationInput,
  condition?: ModelEducationConditionInput | null,
};

export type CreateEducationMutation = {
  createEducation?:  {
    __typename: "Education",
    id: string,
    school: string,
    tier: EducationTiers,
    completion: string,
    createdAt: string,
    updatedAt: string,
    resumeEducationId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateEducationMutationVariables = {
  input: UpdateEducationInput,
  condition?: ModelEducationConditionInput | null,
};

export type UpdateEducationMutation = {
  updateEducation?:  {
    __typename: "Education",
    id: string,
    school: string,
    tier: EducationTiers,
    completion: string,
    createdAt: string,
    updatedAt: string,
    resumeEducationId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteEducationMutationVariables = {
  input: DeleteEducationInput,
  condition?: ModelEducationConditionInput | null,
};

export type DeleteEducationMutation = {
  deleteEducation?:  {
    __typename: "Education",
    id: string,
    school: string,
    tier: EducationTiers,
    completion: string,
    createdAt: string,
    updatedAt: string,
    resumeEducationId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateResumeMutationVariables = {
  input: CreateResumeInput,
  condition?: ModelResumeConditionInput | null,
};

export type CreateResumeMutation = {
  createResume?:  {
    __typename: "Resume",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    links: string,
    bio: string,
    skills: Array< string | null >,
    employment?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    projects?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    education?:  {
      __typename: "ModelEducationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateResumeMutationVariables = {
  input: UpdateResumeInput,
  condition?: ModelResumeConditionInput | null,
};

export type UpdateResumeMutation = {
  updateResume?:  {
    __typename: "Resume",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    links: string,
    bio: string,
    skills: Array< string | null >,
    employment?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    projects?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    education?:  {
      __typename: "ModelEducationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteResumeMutationVariables = {
  input: DeleteResumeInput,
  condition?: ModelResumeConditionInput | null,
};

export type DeleteResumeMutation = {
  deleteResume?:  {
    __typename: "Resume",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    links: string,
    bio: string,
    skills: Array< string | null >,
    employment?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    projects?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    education?:  {
      __typename: "ModelEducationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetApplicationQueryVariables = {
  id: string,
};

export type GetApplicationQuery = {
  getApplication?:  {
    __typename: "Application",
    id: string,
    company: string,
    role: string,
    date_applied: string,
    response?: ResponseValues | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListApplicationsQueryVariables = {
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApplicationsQuery = {
  listApplications?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      company: string,
      role: string,
      date_applied: string,
      response?: ResponseValues | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetExperienceQueryVariables = {
  id: string,
};

export type GetExperienceQuery = {
  getExperience?:  {
    __typename: "Experience",
    id: string,
    company: string,
    role: string,
    start_date: string,
    end_date?: string | null,
    description: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    resumeEmploymentId: string,
    resumeProjectsId: string,
    owner?: string | null,
  } | null,
};

export type ListExperiencesQueryVariables = {
  filter?: ModelExperienceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExperiencesQuery = {
  listExperiences?:  {
    __typename: "ModelExperienceConnection",
    items:  Array< {
      __typename: "Experience",
      id: string,
      company: string,
      role: string,
      start_date: string,
      end_date?: string | null,
      description: Array< string | null >,
      createdAt: string,
      updatedAt: string,
      resumeEmploymentId: string,
      resumeProjectsId: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEducationQueryVariables = {
  id: string,
};

export type GetEducationQuery = {
  getEducation?:  {
    __typename: "Education",
    id: string,
    school: string,
    tier: EducationTiers,
    completion: string,
    createdAt: string,
    updatedAt: string,
    resumeEducationId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListEducationsQueryVariables = {
  filter?: ModelEducationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEducationsQuery = {
  listEducations?:  {
    __typename: "ModelEducationConnection",
    items:  Array< {
      __typename: "Education",
      id: string,
      school: string,
      tier: EducationTiers,
      completion: string,
      createdAt: string,
      updatedAt: string,
      resumeEducationId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetResumeQueryVariables = {
  id: string,
};

export type GetResumeQuery = {
  getResume?:  {
    __typename: "Resume",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    links: string,
    bio: string,
    skills: Array< string | null >,
    employment?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    projects?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    education?:  {
      __typename: "ModelEducationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListResumesQueryVariables = {
  filter?: ModelResumeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListResumesQuery = {
  listResumes?:  {
    __typename: "ModelResumeConnection",
    items:  Array< {
      __typename: "Resume",
      id: string,
      fullName: string,
      email: string,
      phoneNumber: string,
      links: string,
      bio: string,
      skills: Array< string | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateApplicationSubscriptionVariables = {
  filter?: ModelSubscriptionApplicationFilterInput | null,
  owner?: string | null,
};

export type OnCreateApplicationSubscription = {
  onCreateApplication?:  {
    __typename: "Application",
    id: string,
    company: string,
    role: string,
    date_applied: string,
    response?: ResponseValues | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateApplicationSubscriptionVariables = {
  filter?: ModelSubscriptionApplicationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateApplicationSubscription = {
  onUpdateApplication?:  {
    __typename: "Application",
    id: string,
    company: string,
    role: string,
    date_applied: string,
    response?: ResponseValues | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteApplicationSubscriptionVariables = {
  filter?: ModelSubscriptionApplicationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteApplicationSubscription = {
  onDeleteApplication?:  {
    __typename: "Application",
    id: string,
    company: string,
    role: string,
    date_applied: string,
    response?: ResponseValues | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateExperienceSubscriptionVariables = {
  filter?: ModelSubscriptionExperienceFilterInput | null,
  owner?: string | null,
};

export type OnCreateExperienceSubscription = {
  onCreateExperience?:  {
    __typename: "Experience",
    id: string,
    company: string,
    role: string,
    start_date: string,
    end_date?: string | null,
    description: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    resumeEmploymentId: string,
    resumeProjectsId: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateExperienceSubscriptionVariables = {
  filter?: ModelSubscriptionExperienceFilterInput | null,
  owner?: string | null,
};

export type OnUpdateExperienceSubscription = {
  onUpdateExperience?:  {
    __typename: "Experience",
    id: string,
    company: string,
    role: string,
    start_date: string,
    end_date?: string | null,
    description: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    resumeEmploymentId: string,
    resumeProjectsId: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteExperienceSubscriptionVariables = {
  filter?: ModelSubscriptionExperienceFilterInput | null,
  owner?: string | null,
};

export type OnDeleteExperienceSubscription = {
  onDeleteExperience?:  {
    __typename: "Experience",
    id: string,
    company: string,
    role: string,
    start_date: string,
    end_date?: string | null,
    description: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    resumeEmploymentId: string,
    resumeProjectsId: string,
    owner?: string | null,
  } | null,
};

export type OnCreateEducationSubscriptionVariables = {
  filter?: ModelSubscriptionEducationFilterInput | null,
  owner?: string | null,
};

export type OnCreateEducationSubscription = {
  onCreateEducation?:  {
    __typename: "Education",
    id: string,
    school: string,
    tier: EducationTiers,
    completion: string,
    createdAt: string,
    updatedAt: string,
    resumeEducationId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateEducationSubscriptionVariables = {
  filter?: ModelSubscriptionEducationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateEducationSubscription = {
  onUpdateEducation?:  {
    __typename: "Education",
    id: string,
    school: string,
    tier: EducationTiers,
    completion: string,
    createdAt: string,
    updatedAt: string,
    resumeEducationId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteEducationSubscriptionVariables = {
  filter?: ModelSubscriptionEducationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteEducationSubscription = {
  onDeleteEducation?:  {
    __typename: "Education",
    id: string,
    school: string,
    tier: EducationTiers,
    completion: string,
    createdAt: string,
    updatedAt: string,
    resumeEducationId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateResumeSubscriptionVariables = {
  filter?: ModelSubscriptionResumeFilterInput | null,
  owner?: string | null,
};

export type OnCreateResumeSubscription = {
  onCreateResume?:  {
    __typename: "Resume",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    links: string,
    bio: string,
    skills: Array< string | null >,
    employment?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    projects?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    education?:  {
      __typename: "ModelEducationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateResumeSubscriptionVariables = {
  filter?: ModelSubscriptionResumeFilterInput | null,
  owner?: string | null,
};

export type OnUpdateResumeSubscription = {
  onUpdateResume?:  {
    __typename: "Resume",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    links: string,
    bio: string,
    skills: Array< string | null >,
    employment?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    projects?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    education?:  {
      __typename: "ModelEducationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteResumeSubscriptionVariables = {
  filter?: ModelSubscriptionResumeFilterInput | null,
  owner?: string | null,
};

export type OnDeleteResumeSubscription = {
  onDeleteResume?:  {
    __typename: "Resume",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    links: string,
    bio: string,
    skills: Array< string | null >,
    employment?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    projects?:  {
      __typename: "ModelExperienceConnection",
      nextToken?: string | null,
    } | null,
    education?:  {
      __typename: "ModelEducationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
