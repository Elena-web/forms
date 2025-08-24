export type FormData = {
  name: string;
  age: number;
  email: string;
  gender: string;
  isAccept: boolean;
  password: string;
  country: string;
  image: string;
};

export type FormData2 = {
  name: string;
  age: number;
  email: string;
  gender: string;
  isAccept: boolean;
  password: string;
  country: string;
  image: FileList;
};

export interface MyFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  passwordConfirm: HTMLInputElement;
  gender: HTMLInputElement;
  isAccept: HTMLInputElement;
  country: HTMLSelectElement;
  image: HTMLInputElement;
}

export interface MyForm extends HTMLFormElement {
  readonly elements: MyFormElements;
}
