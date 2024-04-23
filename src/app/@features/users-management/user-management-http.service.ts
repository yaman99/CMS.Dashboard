import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const user_management_url = `${environment.userManagemntUrl}`;
@Injectable({
  providedIn: 'root',
})
export class UserManagementHttpService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${user_management_url}/get-all-users`);
  }
  getUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${user_management_url}/get-user/${userId}`);
  }
  addUser(payload: any): Observable<any[]> {
    return this.http.post<any[]>(`${user_management_url}/add-new-user`, payload);
  }
  updateUser(payload: any): Observable<any[]> {
    return this.http.post<any[]>(`${user_management_url}/update-user`, payload);
  }
  deleteUser(payload: any): Observable<any[]> {
    return this.http.post<any[]>(`${user_management_url}/delete-user`, { userId: payload });
  }
}
