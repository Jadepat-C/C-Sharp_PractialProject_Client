import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { TravelExpensesService } from '../service/travel-expenses.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TravelExpensesEntity } from '../model/travel-expenses-entity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  providers: [MessageService]
})
export class InsertComponent {
  @ViewChild('insertForm') insertForm!: NgForm;
  @ViewChild('responseModal') responseModal: any;

  // Form input fields
  public id: string = "";
  public refNumber: string = "";
  public titleEn: string = "";
  public purposeEn: string = "";
  public startDate: string = "";
  public endDate: string = "";
  public airFare: number = 0;
  public otherTransport: number = 0;
  public lodging: number = 0;
  public meals: number = 0;
  public otherExpenses: number = 0;
  public total: number = 0;

  error: string = "";
  notice: string = "";

  constructor(
    private travelExpensesService: TravelExpensesService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private router: Router
  ){}

  ngOnInit() {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

    /**
   * Calculate the total expense based on form input fields.
   */
    public calculateTotal() {
      this.total = this.airFare + this.otherTransport + this.lodging +this.meals + this.otherExpenses;
    }

    /**
   * Reset all form input fields to their initial values.
   */
  public reset() {
    this.error = "";
  }
  
  public submit(){
      // Create a TravelExpensesDTO object based on form data
      const travelExpense: TravelExpensesEntity = {
        id: this.id,
        refNumber: this.refNumber,
        titleEn: this.titleEn,
        purposeEn: this.purposeEn,
        startDate: this.startDate,
        endDate: this.endDate,
        airfare: this.airFare,
        otherTransport: this.otherTransport,
        lodging: this.lodging,
        meals: this.meals,
        otherExpenses: this.otherExpenses,
        total: this.total
      };

      this.travelExpensesService.insert(travelExpense).subscribe(
        (response) => {
          this.notice = 'Record ' + this.refNumber + ' added';
          this.reset();
          // this.modalService.open(this.responseModal);
          this.router.navigate(['/dashboard'], { queryParams: { notice: this.notice } });
        },
        (error) => {
          console.error('Error: ', error);
          this.error = error.error;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.error,
          });
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      );
  }
}
