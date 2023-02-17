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
import {AuthorService} from "../../services/author.service";
import {Author} from "../../models/author.model";

@Component({
  selector: 'app-advertisement-form',
  templateUrl: './advertisement-form.component.html',
  styleUrls: ['./advertisement-form.component.scss'],
})
export class AdvertisementFormComponent implements OnInit, OnDestroy {
  constructor(private advertisementService: AdvertisementService, private authorService: AuthorService) {}

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
    authorId: new FormControl(0,[Validators.required]),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    createdDate: new FormControl('', [Validators.required]),
    modifiedDate: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    finishedDate: new FormControl('', [Validators.required]),
  });

  authors: Author[] = [];

  private subscription = new Subscription();

  ngOnInit(): void {
    const partialCopy = { ...this.initialState } as Partial<Advertisement>
    delete partialCopy.author;

    if (this.isUpdate) {
      this.advertisementForm.controls['id'].disable();
      this.advertisementForm.controls['authorId'].disable();
    }

    this.advertisementForm.setValue({
      ...partialCopy as Omit<Advertisement, 'author'>,
    });

    if(this.isCreate) {
      const subAuthor = this.authorService.getAuthors().subscribe((data => { this.authors = data }));
      this.subscription.add(subAuthor);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit() {
    if (this.isCreate) {
      const subAdCreate = this.advertisementService
        .createAdvertisement(this.advertisementForm.value as Advertisement)
        .subscribe(() => {
          this.handleBack();
        });
      // this.subscription.add(subAdCreate);
    }
    if (this.isUpdate) {
      const subAdUpdate = this.advertisementService
        .updateAdvertisement(
          this.initialState.id,
          { ...this.advertisementForm.value, id: this.initialState.id, authorId: this.initialState.authorId } as Advertisement
        )
        .subscribe(() => {
          this.handleBack();
        });
      // this.subscription.add(subAdUpdate);
    }
  }

  handleBack() {
    this.resetState.emit();
  }

  changeAuthor(e: Event) {
    const select = e.target! as  HTMLSelectElement;
    this.advertisementForm.get('authorId')?.setValue(+select.value, { onlySelf: true, } );
  }
}
