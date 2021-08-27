import { CreateInterviewInput } from 'src/hiring/usecases/create-interview/CreateInterviewInput.dto';

export const MockCreateInterviewInput = (
  values?: Partial<CreateInterviewInput>,
) => {
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
