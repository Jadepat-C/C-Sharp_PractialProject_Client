import { Component, TemplateRef } from '@angular/core';
import { TravelExpensesEntity } from '../model/travel-expenses-entity';
import { TravelExpensesService } from '../service/travel-expenses.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]
})
export class DashboardComponent {
  
  dataset: TravelExpensesEntity[] = [];
  filteredDataset: TravelExpensesEntity[] = [];
  isFiltered = false;
  selectedInstance?: TravelExpensesEntity;
  // Current page number
  currentPage: number = 1;

  // Number of items to display per page
  itemsPerPage: number = 30;

  totalInstance: number = 0;

  query: string = '';

  constructor(
    private travelExpensesService: TravelExpensesService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit() {
    // Call getData() to fetch initial data
    this.getData();
    // Call getPaginationLength() once during component initialization
    this.getPaginationLength();
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

  getPaginationLength(){
    this.travelExpensesService.getCount().subscribe(
      (count: number) => {
        this.totalInstance = count;
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    );
    return this.totalInstance;
  }

  onPageChange(event: any): void {
    // Handle page change event from mat-paginator
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    if (!this.isFiltered){
      this.dataset = [];
      this.getData();
    }
    
  }

  displayedInstances(){
    if (this.filteredDataset.length != 0){
      const rangeMin = (this.currentPage - 1) * this.itemsPerPage;
      const rangeMax = rangeMin + this.itemsPerPage;
      var filteredRange = this.filteredDataset.slice(rangeMin, rangeMax);
      return filteredRange
    } else{
      return this.dataset;
    }
    
  }

  selectInstance(instance: TravelExpensesEntity){
    this.selectedInstance = instance;
    this.router.navigate(['detail', instance.id])
  }

  getData() {
    this.travelExpensesService.get(this.itemsPerPage, this.currentPage-1).subscribe(
      (result) => {
        this.dataset = result;
        this.getPaginationLength();
      },
      (error) => {
        console.error('HTTP Error:', error);
        if (error.name.contains('timeout')){
          this.showErrorToast('Error','Connection timeout, please reflesh.');
        }
        else if(error.status == 500)
        {
          this.showErrorToast('Error','Something went wrong with server, please try again later.')
        }
        else
        {
          this.showErrorToast('Error','Something went wrong while loading data.')
        }
        
      });
  }

  search() {
    this.isFiltered = false;
    this.dataset = [];
    if (this.query != ''){
      this.travelExpensesService.search(this.query).subscribe(
        (result) => {
          this.filteredDataset = result;
          this.dataset = result;
          this.totalInstance = result.length;
          if (this.totalInstance == 5000){
            this.messageService.add({
              severity: 'warn', 
              summary: 'Warning', 
              detail: 'Search results return more than 5,000 values, only first 5,000 values are shown.',
              life: 10000
            });
          }
          if(this.totalInstance == 0){
            this.messageService.add({
              severity: 'error', 
              summary: 'Error', 
              detail: `Cannot find anything contains: '${this.query}'`,
              life: 10000
            });
          }
          this.isFiltered = true
        },
        (error) => {
          console.error('HTTP Error:', error);
          this.showErrorToast('Error','Something went wrong.')
        }
      );
    } else {
      this.isFiltered = false;
      this.getData();
      this.filteredDataset = [];
    }
  }
}
