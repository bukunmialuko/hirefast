export default interface FormProps<T> {
  onSubmit: (values: T) => Promise<void>;
  loading: boolean;
  error: { message: string }[];
}
