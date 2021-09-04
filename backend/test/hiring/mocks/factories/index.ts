import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Candidate } from 'src/hiring/domain/interview/Candidate';
import {
  Interview,
  InterviewStatus,
} from 'src/hiring/domain/interview/Interview';
import {
  Question,
  QuestionResponse,
} from 'src/hiring/domain/interview/Question';
import { Panelist } from 'src/hiring/domain/Panelist';
import { AddCandidateInput } from 'src/hiring/usecases/add-candidate/AddCandidateInput.dto';
import { AddQuestionInput } from 'src/hiring/usecases/add-question/AddQuestionInput.dto';
import { CreateInterviewInput } from 'src/hiring/usecases/create-interview/CreateInterviewInput.dto';
import { PublishInterviewInput } from 'src/hiring/usecases/publish-interview/PublishInterviewInput.dto';

export const MockPanelist = (values?: Partial<Panelist>): Panelist => {
  const defaultValues = {
    id: 'iweoiropreiwuripowqropwqer',
    email: 'escanor@sevendeadlysins.com',
    companyName: 'The Official Testing Company',
    fullName: 'Escanor',
    ...values,
  };
  const mock = new Panelist();
  mock.id = defaultValues.id;
  mock.companyName = defaultValues.companyName;
  mock.fullName = defaultValues.fullName;
  mock.email = defaultValues.email;
  return mock;
};

export const MockCreateInterviewInput = (
  values?: Partial<CreateInterviewInput>,
): CreateInterviewInput => {
  const defaultValues = {
    panelistId: 'iweoiropreiwuripowqropwqer',
    jobTitle: 'The Tester of the Century',
    companyName: 'The Official Testing Company',
    jobDescription: 'This is only for the testers',
    deadlineDate: '2021-09-06T02:32:24.020Z',
    ...values,
  };
  const mock = new CreateInterviewInput();
  mock.panelistId = defaultValues.panelistId;
  mock.companyName = defaultValues.companyName;
  mock.jobTitle = defaultValues.jobTitle;
  mock.deadlineDate = defaultValues.deadlineDate;
  mock.jobDescription = defaultValues.jobDescription;
  return mock;
};

export const MockInterview = (values?: Partial<Interview>): Interview => {
  const defaultValues = {
    id: 'sajnhaskldjfl;sajdfl;jas;ldfjsd',
    panelistId: 'slkdfjsal;kdjfkl;asjdflk;jaskdl;fjkls;adf',
    interviewDetails: {
      jobTitle: 'The Tester of the Century',
      companyName: 'The Official Testing Company',
      jobDescription: 'This is only for the testers',
      deadlineDate: '2021-09-06T02:32:24.020Z',
      ...values?.interviewDetails,
    },
    questions: [],
    status: InterviewStatus.DRAFT,
    createdAt: '2021-08-27T09:41:27.851Z',
    updatedAt: '2021-08-27T09:41:27.851Z',
    ...values,
  };

  const mock = new Interview();
  mock.id = defaultValues.id;
  mock.panelistId = defaultValues.panelistId;
  mock.interviewDetails = defaultValues.interviewDetails;
  mock.questions = defaultValues.questions;
  mock.status = defaultValues.status;
  mock.createdAt = defaultValues.createdAt;
  mock.updatedAt = defaultValues.updatedAt;
  return mock;
};

export const MockAddQuestionInput = (
  values?: Partial<AddQuestionInput>,
): AddQuestionInput => {
  const defaultValues = {
    interviewId: 'asjkdvaksdfksadf',
    panelistId: 'asdflksajdflkajskdfsad',
    title: 'This is really good question',
    responseType: QuestionResponse.TEXT,
    timeAllowedInMinutes: 2,
    ...values,
  };
  const mock = new AddQuestionInput();
  mock.interviewId = defaultValues.interviewId;
  mock.panelistId = defaultValues.panelistId;
  mock.title = defaultValues.title;
  mock.responseType = defaultValues.responseType;
  mock.timeAllowedInMinutes = defaultValues.timeAllowedInMinutes;
  return mock;
};

export const MockQuestion = (values?: Partial<Question>): Question => {
  const defaultValues = {
    sequenceNumber: 1,
    title: 'This is really good question',
    responseType: QuestionResponse.TEXT,
    timeAllowedInMinutes: 2,
    ...values,
  };
  const mock = new Question();
  mock.sequenceNumber = defaultValues.sequenceNumber;
  mock.title = defaultValues.title;
  mock.responseType = defaultValues.responseType;
  mock.timeAllowedInMinutes = defaultValues.timeAllowedInMinutes;
  return mock;
};

export const MockPublishInterviewInput = (
  values?: Partial<PublishInterviewInput>,
): PublishInterviewInput => {
  const defaultValues = {
    panelistId: 'sandjsadfjsakldjflsajvkjdl; as; ldj',
    interviewId: 'saldjfklasjdfv;ajsdvjaisjdfnmefs',
    ...values,
  };

  const mock = new PublishInterviewInput();
  mock.panelistId = defaultValues.panelistId;
  mock.interviewId = defaultValues.interviewId;
  return mock;
};

export const MockAddCandidateInput = (
  values?: Partial<AddCandidateInput>,
): AddCandidateInput => {
  const defaultValues = {
    interviewId: 'kjvhlksdfjvklklvkjhvnkl;jblk;jwdjkfvjsvdsfgvdf',
    panelistId: 'sdfgdsvbsdfkvjfbl;adslvjsdfbsdflvjl;dfv',
    name: 'Forrest Gump',
    email: 'forrest.gump@gmail.com',
    phoneNumber: '+919781795334',
    ...values,
  };
  const mock = new AddCandidateInput();
  mock.interviewId = defaultValues.interviewId;
  mock.panelistId = defaultValues.panelistId;
  mock.name = defaultValues.name;
  mock.email = defaultValues.email;
  mock.phoneNumber = defaultValues.phoneNumber;
  return mock;
};
