import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const community_management_url = `${environment.communityManagementUrl}`;
@Injectable({
  providedIn: 'root',
})
export class CommunityHttpService {
  constructor(private http: HttpClient) {}
  addCommunity(payload: any): Observable<any[]> {
    return this.http.post<any[]>(`${community_management_url}/add-community`, payload);
  }
  deleteCommunity(payload: any): Observable<any[]> {
    return this.http.post<any[]>(`${community_management_url}/delete-community`, payload);
  }
  getInstructorCommunities(): Observable<any> {
    return this.http.get<any>(`${community_management_url}/get-instructor-communities`);
  }
  getStudentCommunities(): Observable<any> {
    return this.http.get<any>(`${community_management_url}/get-student-communities`);
  }
  getAllCommunities(): Observable<any> {
    return this.http.get<any>(`${community_management_url}/get-communities`);
  }

  joinCommunity(payload: any): Observable<any> {
    return this.http.post<any>(`${community_management_url}/join-community`, payload);
  }
  leaveCommunity(payload: any): Observable<any> {
    return this.http.post<any>(`${community_management_url}/leave-community`, payload);
  }
  addPost(payload: any): Observable<any> {
    return this.http.post<any>(`${community_management_url}/add-post`, payload);
  }
  deletePost(payload: any): Observable<any> {
    return this.http.post<any>(`${community_management_url}/delete-post`, payload);
  }
  likePost(payload: any): Observable<any> {
    return this.http.post<any>(`${community_management_url}/like-post`, payload);
  }

  getAllPosts(commuinty: string): Observable<any> {
    return this.http.get<any>(`${community_management_url}/get-posts/${commuinty}`);
  }
  updateCommunity(payload: any): Observable<any> {
    return this.http.post<any>(`${community_management_url}/update-community`, payload);
  }

  //


  setCommunitiesInStorage(Communities:any){
    localStorage.setItem('Communities' , JSON.stringify(Communities))
  }
  getCommunitiesFromStorage():any[]{
    return JSON.parse(localStorage.getItem('Communities')!)
  }
}
