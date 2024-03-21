import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  HostListener,
  Input, OnChanges,
  OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {NgStyle} from "@angular/common";
import {Card} from "../../models/classes/card";
import {CardComponent} from "../../card/card.component";

@Component({
  selector: 'app-card-line',
  standalone: true,
  imports: [
    NgStyle,
    CardComponent
  ],
  templateUrl: './card-line.component.html',
  styleUrl: './card-line.component.scss'
})
export class CardLineComponent implements AfterViewInit, OnInit,OnChanges{
  @ViewChild('cardContainer') cardContainerRef: ElementRef;
  @Input() cards: Card[] = [];
  containerWidth: number = 0;
  cardStyles: any[] = [];
  @Output() cardSelected : EventEmitter<Card> = new EventEmitter<Card>();

  constructor(private cdr: ChangeDetectorRef) {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.calculateContainerWidth();
    this.calculateCardStyles();
    this.cdr.detectChanges(); // Trigger change detection here if necessary
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("detection changes")
    if (changes["cards"]) {
      this.calculateCardStyles();
      this.cdr.detectChanges();
    }
  }
  private onCardsChanged() {
    // Execute the methods you need when the cards input changes
    console.log('Cards have changed', this.cards);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateContainerWidth();
    this.calculateCardStyles()
  }

  calculateContainerWidth() {
    const containerElement = this.cardContainerRef.nativeElement;
    this.containerWidth = containerElement.clientWidth;
  }

  calculateCardStyles() {
    const len = this.cards.length;
    const gap = 1; // Define the gap between cards
    const minWidth = 60; // Define the minimum width of each card
    const preferredWidth = 60; // Define the preferred width of each card
    const maxWidth = 60; // Define the preferred width of each card
    const widthHeightRatio = 1.5; // Define the preferred width of each card
    let styles = [];
    const availableCardWidth = (this.containerWidth - (len - 1) * (gap))/len;
    let chosenWidth = Math.min(maxWidth, availableCardWidth);

    if (chosenWidth >= minWidth) {
      let accumulatedLeft = 0;
      styles = this.cards.map(card => {
        const style = {
          width: chosenWidth,
          left: accumulatedLeft
        };
        accumulatedLeft += chosenWidth + gap;
        return style;
      }
      );
    }
    else {
      // Calculate overlap for a fanned-out effect
      const totalOverlap = (preferredWidth) * len - this.containerWidth;
      const overlap = totalOverlap / (len - 1);
      let accumulatedLeft = 0;
      styles = this.cards.map((card, index) => {
        const style = {
          width: preferredWidth,
          left: accumulatedLeft
        };
        accumulatedLeft += preferredWidth - overlap ;
        return style;
      });
    }
    //generate styles
    this.cardStyles = styles.map(style => {
      return {
        width : style.width+'px',
        height: style.width * widthHeightRatio+'px',
        left: style.left+'px',
        "font-size": style.width * 0.275+'px',
      };
    });
  }
  selectCard(card: Card) {
    this.cardSelected.emit(card); // Emit the selected card data
  }
}
