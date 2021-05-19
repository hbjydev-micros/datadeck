interface IField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'select';
    options?: ISelectOptions;
}

interface ISelectOptions {
    value: string;
    label: string;
}

export { IField, ISelectOptions };