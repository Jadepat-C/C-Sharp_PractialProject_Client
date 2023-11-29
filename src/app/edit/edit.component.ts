import { Component, Input, ViewChild } from '@angular/core';
import { TravelExpensesEntity } from '../model/travel-expenses-entity';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, EnabledBlockingInitialNavigationFeature, Router } from '@angular/router';
import { TravelExpensesService } from '../service/travel-expenses.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {  
  @Input() selectedInstance?: TravelExpensesEntity;
  @ViewChild('editForm') editForm!: NgForm;
  @ViewChild('responseModal') responseModal: any;

  // Declare variables to hold form field values
  public id: string = "";
  public refNumber: string = "";
  public titleEn: string = "";
  public purposeEn: string = "";
  public startDate: string = "";
  public endDate: string = "";
  public airfare: number = 0;
  public otherTransport: number = 0;
  public lodging: number = 0;
  public meals: number = 0;
  public otherExpenses: number = 0;
  public total: number = 0;

  error: string = "";
  notice: string = "";

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private travelExpensesService: TravelExpensesService,
    private modalService: NgbModal,
    private location: Location,
    private datePipe: DatePipe
  ){}

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      const id = params['id']; // Get the 'id' parameter from the URL

      this.travelExpensesService.getByID(id).subscribe(
        (result) => {
          this.selectedInstance = result; // Assign the fetched data to selectedInstance
          console.log('Data received:', this.selectedInstance);

          // Populate form fields with fetched data
          this.id = this.selectedInstance.id;
          this.refNumber = this.selectedInstance.refNumber;
          this.titleEn = this.selectedInstance.titleEn;
          this.purposeEn = this.selectedInstance.purposeEn;
          this.startDate = this.selectedInstance.startDate ? this.datePipe.transform(this.selectedInstance.startDate, 'yyyy-MM-dd')! : '';
          this.endDate = this.selectedInstance.endDate ? this.datePipe.transform(this.selectedInstance.endDate, 'yyyy-MM-dd')! : '';
          this.airfare = this.selectedInstance.airfare;
          this.otherTransport = this.selectedInstance.otherTransport;
          this.lodging = this.selectedInstance.lodging
          this.meals = this.selectedInstance.meals;
          this.otherExpenses = this.selectedInstance.otherExpenses;
          this.calculateTotal();
        },
        (error) => {
          console.error('HTTP Error:', error);
        }
      );
    });
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

    /**
   * Calculates the total expense based on form field values.
   */
    public calculateTotal() {
      this.total = this.airfare + this.otherTransport + this.lodging + this.meals + this.otherExpenses;
    }
  
    /**
     * Handles the cancel button click to navigate back.
     */
    public cancel() {
      this.location.back();
    }

    /**
   * Handles the update button click to update the record.
   * Checks if the "Ref Number" field is valid before proceeding with the update.
   */
  public update() {
    this.activateRoute.params.subscribe(params => {
      const id = params['id']; // Get the 'id' parameter from the URL

      // Create a TravelExpensesEntity object based on form data
      const updateItem: TravelExpensesEntity = {
        id: id,
        refNumber: this.refNumber,
        titleEn: this.titleEn,
        purposeEn: this.purposeEn,
        startDate: this.startDate,
        endDate: this.endDate,
        airfare: this.airfare,
        otherTransport: this.otherTransport,
        lodging: this.lodging,
        meals: this.meals,
        otherExpenses: this.otherExpenses,
        total: this.total
      };

      // Use the TravelExpensesService to update the record
      this.travelExpensesService.update(updateItem).subscribe(
        (response) => {
          this.notice = `Record '${this.refNumber}' updated`
          //this.modalService.open(this.responseModal);
          this.router.navigate([`/detail/${updateItem.id}`], { queryParams: { notice: this.notice } });
        },
        (error) => {
          console.error('Error: ', error);
          this.error = error.error;
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      );
    }
  );
  }
}
