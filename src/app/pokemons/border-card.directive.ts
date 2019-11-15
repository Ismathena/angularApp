import { Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]' 
})
export class BorderCardDirective {


	private defaultColor : string = "#009688";
	private initialColor : string = "#A3A3A3";
	private defaultHeight : number = 220;

	constructor(private el: ElementRef) {
		this.setBorder(this.initialColor);
		this.setHeight(this.defaultHeight);
	}

	@Input('pkmnBorderCard') borderColor : string;

	@HostListener("mouseenter") onMouseEnter(){

	    this.setBorder( this.borderColor || this.defaultColor );

	}

	@HostListener("mouseleave") onMouseLeave(){

        this.setBorder( this.initialColor );

	}

	private setBorder(color: string) {
		let border = 'solid 4px ' + color;
		this.el.nativeElement.style.border = border;
	}

	private setHeight(height: number) {
		this.el.nativeElement.style.height = height + 'px';
	}

	private setMargin( margin : number){

		this.el.nativeElement.style.margin = margin +'px';
	}
}