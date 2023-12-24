import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetWorkspaceResponse } from './response/getWorkspaceResponse';
import { UpdateWorkspaceRequest } from './requests/updateWorkspaceRequest';
import { AffiliateCount } from '@shared/models/dashboard/workspaceDashboard';
import { GetWorkspaceDashboardViewResponse } from './response/getWorkspaceDashboardViewResponse';

const WORKSPACE_ENDPOINT = `${environment.workspaceApiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class WorkspaceApiService {
  constructor(private http: HttpClient) {}

  getByOwner(workspaceId: string): Observable<GetWorkspaceResponse> {
    return this.http.get<GetWorkspaceResponse>(
      `${WORKSPACE_ENDPOINT}/GetWorkspaceByOwner/${workspaceId}`
    );
  }
  update(workspace: UpdateWorkspaceRequest): Observable<any> {
    return this.http.post<any>(`${WORKSPACE_ENDPOINT}/UpdateWorkspace`, workspace);
  }
  getDashboard(workspaceId: string): Observable<GetWorkspaceDashboardViewResponse> {
    return this.http.get<GetWorkspaceDashboardViewResponse>(
      `${WORKSPACE_ENDPOINT}/GetWorkspaceDashboardView/${workspaceId}`
    );
  }
}
