import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ILoginResponse,
  IPic,
  IUser,
  IUsernameAvailableResponse
} from '../../interfaces/media';

@Injectable()
export class MediaProvider {
  constructor(public http: HttpClient) {
    this.http = http;
  }

  mediaApi = 'http://media.mw.metropolia.fi/wbma';

  loggedIn = false;

  getAllFiles = () => {
    return this.http.get<IPic[]>(this.mediaApi + '/media?start=0&limit=10');
  };

  getSingleMedia = (id: number) => {
    return this.http.get<IPic>(this.mediaApi + `/media/${id}`);
  };

  login = (user: IUser) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ILoginResponse>(
      this.mediaApi + '/login',
      user,
      httpOptions
    );
  };

  register = (user: IUser) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ILoginResponse>(
      this.mediaApi + '/users',
      user,
      httpOptions
    );
  };

  checkUsername = (username: string) => {
    return this.http.get<IUsernameAvailableResponse>(
      this.mediaApi + '/users/username/' + username
    );
  };
}
