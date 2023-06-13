import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { JobHistoryFormService, JobHistoryFormGroup } from './job-history-form.service';
import { IJobHistory } from '../job-history.model';
import { JobHistoryService } from '../service/job-history.service';
import { Language } from 'app/entities/enumerations/language.model';

@Component({
  selector: 'jhi-job-history-update',
  templateUrl: './job-history-update.component.html',
})
export class JobHistoryUpdateComponent implements OnInit {
  isSaving = false;
  jobHistory: IJobHistory | null = null;
  languageValues = Object.keys(Language);

  editForm: JobHistoryFormGroup = this.jobHistoryFormService.createJobHistoryFormGroup();

  constructor(
    protected jobHistoryService: JobHistoryService,
    protected jobHistoryFormService: JobHistoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      this.jobHistory = jobHistory;
      if (jobHistory) {
        this.updateForm(jobHistory);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobHistory = this.jobHistoryFormService.getJobHistory(this.editForm);
    if (jobHistory.id !== null) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistory>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(jobHistory: IJobHistory): void {
    this.jobHistory = jobHistory;
    this.jobHistoryFormService.resetForm(this.editForm, jobHistory);
  }
}
