// import { Injectable } from '@angular/core';
// import { Action, Selector, State, StateContext } from '@ngxs/store';
// import { LoadingHandler } from '@shared/state-helpers';
// import { tap } from 'rxjs';
// import { AffiliateCount, WorkspaceStateModel } from '../workspaceDashboardStateModel';
// import { WorkspaceDashboardStateActions } from '../actions/WorkspaceDashboard.action';
// import { ConversionsStatusCount } from '@shared/models/dashboard/workspaceDashboard';
// import { WorkspaceApiService } from '@shared/api/workspaceApi/workspace-api.service';

// @State<WorkspaceStateModel>({
//   name: 'dashboard',
//   defaults: {
//     isLoading: false,
//     conversionsAverage: [],
//     conversionsStatusCount: {
//       approved: 0,
//       pending: 0,
//       rejected: 0,
//     },
//     affiliatesCount: {
//       totalActiveAffiliates: 0,
//       totalCanceledAffiliates: 0,
//     },
//   },
// })
// @Injectable()
// export class WorkspaceDashboardState extends LoadingHandler<WorkspaceStateModel> {
//   // @Selector()
//   // static isLoading(state: WorkspaceStateModel): boolean {
//   //   return state.isLoading;
//   // }
//   // @Selector()
//   // static conversionsAverage(state: WorkspaceStateModel): number[] {
//   //   return state.conversionsAverage!;
//   // }
//   // @Selector()
//   // static conversionsStatusCount(state: WorkspaceStateModel): ConversionsStatusCount {
//   //   return state.conversionsStatusCount!;
//   // }
//   // @Selector()
//   // static affiliatesCount(state: WorkspaceStateModel): AffiliateCount {
//   //   return state.affiliatesCount!;
//   // }
//   // constructor(
//   //   private conversionhttpService: ConversionApiService,
//   //   private workspaceHttpService: WorkspaceApiService
//   // ) {
//   //   super();
//   // }

//   // @Action(WorkspaceDashboardStateActions.GetConversionsAverage)
//   // onGetConversionsAverage(
//   //   ctx: StateContext<WorkspaceStateModel>,
//   //   { payload }: WorkspaceDashboardStateActions.GetConversionsAverage
//   // ) {
//   //   this.startLoading(ctx);
//   //   return this.conversionhttpService.getConversionsAverage(payload).pipe(
//   //     tap({
//   //       next: (res) => {
//   //         const weeks = [0, 0, 0, 0];
//   //         res.forEach((data) => {
//   //           if (data.day >= 28) {
//   //             weeks[3] += data.count;
//   //           } else {
//   //             const targetWeek = Math.floor(data.day / 7);
//   //             weeks[targetWeek] += data.count;
//   //           }
//   //         });
//   //         ctx.patchState({
//   //           conversionsAverage: weeks,
//   //         });
//   //       },
//   //       finalize: () => this.stopLoading(ctx),
//   //     })
//   //   );
//   // }

//   // @Action(WorkspaceDashboardStateActions.GetConversionsCountByStatus)
//   // onGetConversionsCountByStatus(
//   //   ctx: StateContext<WorkspaceStateModel>,
//   //   { payload }: WorkspaceDashboardStateActions.GetConversionsCountByStatus
//   // ) {
//   //   this.startLoading(ctx);
//   //   return this.conversionhttpService.getConversionsCountByStatus(payload).pipe(
//   //     tap({
//   //       next: (res) => {
//   //         ctx.patchState({
//   //           conversionsStatusCount: {
//   //             approved: res.approved,
//   //             pending: res.pending,
//   //             rejected: res.rejected,
//   //           },
//   //         });
//   //       },
//   //       finalize: () => this.stopLoading(ctx),
//   //     })
//   //   );
//   // }

//   // @Action(WorkspaceDashboardStateActions.GetAffiliatesCount)
//   // getWorkspaceByOwner(
//   //   ctx: StateContext<WorkspaceStateModel>,
//   //   { workspaceId }: WorkspaceDashboardStateActions.GetAffiliatesCount
//   // ) {
//   //   this.startLoading(ctx);
//   //   return this.workspaceHttpService.getDashboard(workspaceId).pipe(
//   //     tap({
//   //       next: (res) => {
//   //         ctx.patchState({
//   //           affiliatesCount: {
//   //             totalActiveAffiliates: res.totalActiveAffiliates,
//   //             totalCanceledAffiliates: res.totalCanceledAffiliates,
//   //           },
//   //         });
//   //       },
//   //       finalize: () => this.stopLoading(ctx),
//   //     })
//   //   );
//   // }
// }
