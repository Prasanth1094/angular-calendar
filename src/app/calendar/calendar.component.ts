import { Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef } from '@angular/core';  
  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView
    
  } from 'angular-calendar';
  
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {   
    event: CalendarEvent;    
  };
  events: CalendarEvent[] = [];
 isDeleteAction:boolean=false;  
 isEditAction:boolean=false;
  event = {title: '', time: '', location: ''};

  constructor(private modal: NgbModal ) {};

  refresh: Subject<any> = new Subject();
  dayClicked({date, events }: {date: Date; events: CalendarEvent[] }): void {
    if(this.isDeleteAction==false && this.isEditAction==false){
      this.modalData = { events,date };
    this.modal.open(this.modalContent, { size: 'lg' }).result.then((value) => {
      if(value=='save'){
        this.events = [
          ...this.events,
          {
            title: this.event.title,
            start: this.modalData.date,
            location:this.event.location,
            time:this.event.time       
          },
        ];
      }    
    this.event = {title: '', time: '', location: ''};
    },() => {
      this.event = {title: '', time: '', location: ''};
    });    
    }else{
      this.isDeleteAction=false;
      this.isEditAction=false;
    }
    
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
   this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    //this.dialogRef = this.modal.open(this.modalContent, {width: '500px', height: '450px'});
  }
  editAction( event: CalendarEvent): void {
    this.isEditAction=true;
    this.event=event;
    this.modalData = { event };
   this.modal.open(this.modalContent, { size: 'lg' }).result.then((value) => {
    if(value=='save'){
      this.events = [
        ...this.events,
        {
          title: this.event.title,
          start: this.modalData.date,
          location:this.event.location,
          time:this.event.time       
        },
      ];
    }    
  this.event = {title: '', time: '', location: ''};
  },() => {
    this.event = {title: '', time: '', location: ''};
  });
  }
  deleteAction( event: CalendarEvent): void {
    this.isDeleteAction=true;
    this.events = this.events.filter((iEvent) => iEvent !== event);
  }
  

  

  setView(view: CalendarView) {
    this.view = view;
  }

  
  
}
