import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-card-line',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './card-line.component.html',
  styleUrl: './card-line.component.scss'
})
export class CardLineComponent implements AfterViewInit, OnInit{
  @Input() cards: any[] = [1,2,3,4,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  @Input() overlap: boolean = false;
  @ViewChild('cardContainer') cardContainerRef: ElementRef;
  containerWidth: number = 0;
  cardStyles: any[] = [];
  ngOnInit() {
  }
  ngAfterViewInit() {
    // Ensure the view has been initialized before trying to access the element
    this.calculateContainerWidth();
    this.calculateCardStyles()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateContainerWidth();
    this.calculateCardStyles()
  }

  calculateContainerWidth() {
    const containerElement = this.cardContainerRef.nativeElement;
    this.containerWidth = containerElement.clientWidth; // Uses the clientWidth of the element
    // Optionally, you can subtract any known padding/margin if necessary
  }

  calculateCardStyles() {
    const len = this.cards.length;
    const gap = 1; // Define the gap between cards
    const minWidth = 40; // Define the minimum width of each card
    const preferredWidth = 50; // Define the preferred width of each card
    const maxWidth = 70; // Define the preferred width of each card

    // const totalPreferredWidth =  (preferredWidth + gap) * this.cards.length - gap; // Calculate the total width of all cards (including gaps
    let styles = [];
    const availableCardWidth = (this.containerWidth - (len - 1) * (gap))/len;
    let chosenWidth = Math.min(maxWidth, availableCardWidth);

    if (chosenWidth >= minWidth) {
      let accumulatedLeft = 0;
      styles = this.cards.map(card => {
        const style = {
          width: `${chosenWidth}px`,
          left: `${accumulatedLeft}px`
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
          width: `${preferredWidth}px`,
          left: `${accumulatedLeft}px`
        };
        accumulatedLeft += preferredWidth - overlap ;
        return style;
      });
    }
    // if (totalPreferredWidth <= this.containerWidth) {
    //   // All cards can fit with their preferred width.
    //   styles = this.cards.map(card => ({
    //     width: `${preferredWidth}px`,
    //     left: `${0}px` // Initially set to 0, will adjust below
    //   }));
    // } else {
    //   // Need to adjust card widths or calculate overlap
    //   const totalMinWidth = (minWidth + gap) * this.cards.length - gap; // Calculate the total width of all cards (including gaps
    //   if (totalMinWidth <= this.containerWidth) {
    //     // Cards can fit with reduced widths, adjust proportionally
    //     const availableWidth = this.containerWidth - ((this.cards.length - 1) * gap);
    //     let accumulatedLeft = 0;
    //     styles = this.cards.map(card => {
    //       const proportion = minWidth / totalMinWidth;
    //       const cardWidth = proportion * availableWidth;
    //       const style = {
    //         width: `${cardWidth}px`,
    //         left: `${accumulatedLeft}px`
    //       };
    //       accumulatedLeft += cardWidth + gap;
    //       return style;
    //     });
    //   } else {
    //     // Calculate overlap for a fanned-out effect
    //     const overlap = (totalMinWidth + ((this.cards.length - 1) * gap) - this.containerWidth) / (this.cards.length - 1);
    //     let accumulatedLeft = 0;
    //     styles = this.cards.map((card, index) => {
    //       const cardWidth = card.minWidth;
    //       const style = {
    //         width: `${cardWidth}px`,
    //         left: `${accumulatedLeft}px`
    //       };
    //       accumulatedLeft += index < this.cards.length - 1 ? cardWidth - overlap : 0; // Don't add to the last card
    //       return style;
    //     });
    //   }
    // }
    // Adjust left positions based on calculated widths
    // let currentPosition = parseFloat(styles[0].width + gap);
    // for (let i = 0; i < styles.length; i++) {
    //   if (i > 0) {
    //     styles[i].left += `${currentPosition}px`;
    //     currentPosition += parseFloat(styles[i].width) + gap;
    //   }
    // }
    console.log(styles);
    // this.cardStyles = styles;
    return styles;
  }
}
