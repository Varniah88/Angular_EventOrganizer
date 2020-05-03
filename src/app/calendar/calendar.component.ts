import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {EventInput} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin , interactionPlugin];
  calendarEvents: EventInput[] = [];
  nextevent = 'No Events';
  nexteventdate = '';
  nexteventrem: number;
  today: number;

  noOfEvent = 0;
  constructor() { }
  dayRender(args){
    const cell: HTMLElement = args.el;
    cell.onclick = (ev )  => {
      this.addEvent(args.date);
    };
  }

  eventRender(args){
    const cell: HTMLElement = args.el;
    cell.onclick = (ev )  => {
      this.editEvent(args.date);
    };
  }

  addEvent(date){

     let strdate = date.toString();
     strdate = strdate.slice(0, 16);
     const todaydate = new Date();
     let strtoday = todaydate.toString();
     strtoday = strtoday.substr(8, 2);
     const streventdate = strdate.substr(8, 2);

     let eventdate: number;


     eventdate = parseInt(streventdate);
     this.today = parseInt(strtoday);


     const remi = eventdate - this.today;

     // if (eventdate < this.today){
     //    alert('Date has Expired');
     // }
     //
     // if ( eventdate >= this.today) {
     const title = prompt('Enter Event Title');

       // tslint:disable-next-line:triple-equals
     if (title == '') {
         alert('Event cannot be blank');
       }

    else {
      if ( !(title == null)) {
        this.calendarEvents = this.calendarEvents.concat({
          title,
          start: strdate,
          rem: remi
        });
        this.noOfEvent++;
        this.checkrem();

      }


    }
     }



  editEvent(date){

      console.log(this.calendarEvents);
  }


        delete(hero, i){

            console.log(i);

            this.calendarEvents.splice(i, 1);
            this.noOfEvent--;
            console.log(this.calendarEvents);


          // tslint:disable-next-line:triple-equals
            if (this.calendarEvents.length  == 0) {
              this.nextevent = 'No Events';
              this.nexteventrem = null;
            }
            else{
              this.checkrem();
            }


          }

          edit(hero, i){

            const newtitle = prompt('Edit Event Title');
            // tslint:disable-next-line:triple-equals
            if (newtitle == ''){
              alert('Events cannot be blank');
            }
            // tslint:disable-next-line:triple-equals
            if (!(newtitle == '')) {
              if (!(newtitle == null)) {
                hero.title = newtitle;

                this.checkrem();
              }

            }
  }



          checkrem(){
            let small = 1000;
            let smallevent = '';
            for (let index = 0; index < this.noOfEvent; index++) {
              if (this.calendarEvents[index].rem < small ) {
                small = this.calendarEvents[index].rem;
                smallevent = this.calendarEvents[index].title;
              }

            }

            this.nexteventrem = small;
            this.nextevent = smallevent;

          }


  ngOnInit(): void {
  }

}
