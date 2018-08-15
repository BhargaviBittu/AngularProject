import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable, Subject } from 'rxjs';
@Injectable()
export class Service {

  constructor(public http: Http) { }

  async login(data: object): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await this.http.post('http://localhost:3005/api/login', data).catch((error:any) => 
    Observable.throw(error.json().error || 'Server errorrrr')).map(res => res.json()).toPromise();
    return response;
  }

  async register(data): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await this.http.post('http://localhost:3005/api/register', data).catch((error: any) => 
    Observable.throw(error.json().error || 'Server errorrrr')).map(res => res.json()).toPromise();
    return response;
  }
  async postQuestion(data): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await this.http.post('http://localhost:3005/api/postQuestion', data).catch((error: any) => 
    Observable.throw(error.json().error || 'Server errorrrr')).map(res => res.json()).toPromise();
    return response;
  }

  async getQuestion(): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await this.http.get('http://localhost:3005/api/getQuestion').catch((error: any) => 
    Observable.throw(error.json().error || 'Server errorrrr')).map(res => res.json()).toPromise();
    return response;
  }

  async getMyQuestion(data): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await this.http.post('http://localhost:3005/api/getMyQuestion', data).catch((error: any) => 
    Observable.throw(error.json().error || 'Server errorrrr')).map(res => res.json()).toPromise();
    return response;
  }
  async postAnswer(data): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await this.http.post('http://localhost:3005/api/postAnswer', data).catch((error: any) => 
    Observable.throw(error.json().error || 'Server errorrrr')).map(res => res.json()).toPromise();
    return response;
  }
  async deleteQuestion(data): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await this.http.post('http://localhost:3005/api/deleteQuestion', data).catch((error: any) => 
    Observable.throw(error.json().error || 'Server errorrrr')).map(res => res.json()).toPromise();
    return response;
  }
}
