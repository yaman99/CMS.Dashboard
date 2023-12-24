import { WorkspaceIntegration } from "@shared/models/workspace/WorkspaceIntegration";

export class GetWorkspaceResponse {
  id: string;
  title: string;
  category: string;
  setupCompleted: boolean;
  firsName: string;
  lastName: string;
  subscriptionCode: string;
  integration: WorkspaceIntegration;
}
