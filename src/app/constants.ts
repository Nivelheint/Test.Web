import {HttpHeaders} from "@angular/common/http";

export const URL_API = 'https://localhost:44309/api';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

export const mocks = [
  {
    id: 1,
    authorId: 1,
    author: 'Grisly Pojiloy',
    title: 'Why do it',
    content: 'Lipsum o reldsa dasdcds',
    createdDate: '11-11-2002',
    modifiedDate: '11-11-2002',
    startDate: '11-11-2002',
    finishedDate: '55-11-2222',
  },
  {
    id: 2,
    authorId: 1,
    author: 'SCP 154',
    title: 'Why do it',
    content: 'Lipsum o reldsa dasdcds',
    createdDate: '11-11-2002',
    modifiedDate: '11-11-2002',
    startDate: '11-11-2002',
    finishedDate: '55-11-2222',
  },
  {
    id: 4,
    authorId: 1,
    author: 'DBO Pojiloy',
    title: 'Why do it',
    content: 'Lipsum o reldsa dasdcds',
    createdDate: '11-11-2002',
    modifiedDate: '11-11-2002',
    startDate: '11-11-2002',
    finishedDate: '55-11-2222',
  },
];
