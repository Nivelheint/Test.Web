import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Advertisement } from '../../models/advertisement.model';
import { AdvertisementService } from '../../services/advertisement.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advertisement-form',
  templateUrl: './advertisement-form.component.html',
  styleUrls: ['./advertisement-form.component.scss'],
})
export class AdvertisementFormComponent implements OnInit, OnDestroy {
  constructor(private advertisementService: AdvertisementService) {}

  @Input() isCreate = false;

  @Input() isUpdate = false;

  @Input() initialState: Advertisement = {
    id: 0,
    authorId: 0,
    author: '',
    content: '',
    createdDate: '',
    finishedDate: '',
    modifiedDate: '',
    startDate: '',
    title: '',
  };

  @Output() resetState = new EventEmitter<void>();

  advertisementForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    author: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    createdDate: new FormControl('', [Validators.required]),
    modifiedDate: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    finishedDate: new FormControl('', [Validators.required]),
  });

  private subscription = new Subscription();

  ngOnInit(): void {
    const partialCopy = { ...this.initialState } as Partial<Advertisement>;
    delete partialCopy.authorId;

    if (this.isUpdate) {
      this.advertisementForm.controls['id'].disable();
      this.advertisementForm.controls['author'].disable();
    }

    this.advertisementForm.setValue({
      ...(partialCopy as Omit<Advertisement, 'authorId'>),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    if (this.isCreate) {
      const subAdCreate = this.advertisementService
        .createAdvertisement(this.advertisementForm.value as Advertisement)
        .subscribe(() => {});
      this.subscription.add(subAdCreate);
    }
    if (this.isUpdate) {
      const subAdUpdate = this.advertisementService
        .updateAdvertisement(
          this.advertisementForm.value.id!,
          this.advertisementForm.value as Advertisement
        )
        .subscribe(() => {});
      this.subscription.add(subAdUpdate);
    }
  }

  handleBack() {
    this.resetState.emit();
  }
}
