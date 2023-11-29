import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TravelExpensesEntity } from '../model/travel-expenses-entity';
import { TravelExpensesService } from '../service/travel-expenses.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  @Input() selectedInstance?: TravelExpensesEntity;
  error: string = "";
  notice: string = "";

  // Use ViewChild to reference the responseModal
  @ViewChild('responseModal') responseModal: any;
  
  constructor(
    private travelExpensesService: TravelExpensesService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ){}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      const id = params['id']; // Get the 'id' parameter from the URL

      // Use the TravelExpensesService to fetch the record by ID
      this.travelExpensesService.getByID(id).subscribe(
        (result) => {
          this.selectedInstance = result;
        },
        (error) => {
          console.error('HTTP Error:', error);
          this.showErrorToast('Error','Something went wrong when loading page.');
        }
      );
    });
  }

  ngAfterViewInit(){
    this.route.queryParams.subscribe((params) => {
      var notice = params['notice'];
      console.log(notice);
      if (notice != undefined) {
        this.showSuccessToast('Success', notice);

        // Clear query parameter after displaying the toast
        const navigationExtras: NavigationExtras = {
          replaceUrl: true, // Replace the current state in the history
          queryParams: { notice: undefined },
        };

        this.router.navigate([], navigationExtras);
      }
    });
  }

  showSuccessToast(header:string, msg: string){
    this.messageService.add({
      severity: 'success',
      summary: header,
      detail: msg,
    });
  }

  showErrorToast(header:string, msg: string){
    this.messageService.add({
      severity: 'error',
      summary: header,
      detail: msg,
    });
  }

  delete(){
    //const confirmation = window.confirm('Are you sure you want to delete this record? \nYou cannot undo this action.');

    //if (confirmation) {
      // User clicked "OK," proceed with deletion
      this.route.params.subscribe(params => {
        const id = params['id']; // Get the 'id' parameter from the URL
  
        // Use the TravelExpensesService to delete the record by ID
        this.travelExpensesService.delete(id).subscribe(
          (response) => {
            //window.alert("Record deleted");
            this.notice = 'Record ' + this.selectedInstance?.refNumber + ' deleted';
            this.modalService.dismissAll();
            //this.notice = "Record Deleted"
            //this.modalService.open(this.responseModal);
            this.router.navigate(['/dashboard'], { queryParams: { notice: this.notice } });
          },
          (error) => {
            this.notice = error.error;
            console.error('HTTP Error:', error);
            this.showErrorToast('Error', 'Something went wrong when deleting.')
          }
        );
      });
    //}
  }
}
