import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'cupcake-confirmationmodal',
  templateUrl: './confirmationmodal.component.html',
  styleUrls: ['./confirmationmodal.component.scss']
})
export class ConfirmationmodalComponent implements OnInit {

  public active: boolean = false;
    public body: string;
    public title: string;
    public onClose: Subject<boolean>;

    public constructor(
        private _bsModalRef: BsModalRef
    ) { }

    public ngOnInit(): void {
        this.onClose = new Subject();
    }

    public showConfirmationModal(title: string, body: string): void {
        this.title = title;
        this.body =  body;
        this.active = true;
    }

    public onConfirm(): void {
        this.active = false;
        this.onClose.next(true);
        this._bsModalRef.hide();
    }

    public onCancel(): void {
        this.active = false;
        this.onClose.next(false);
        this._bsModalRef.hide();
    }

    public hideConfirmationModal(): void {
        this.active = false;
        this.onClose.next(null);
        this._bsModalRef.hide();
    }

}
