import { Color } from "tns-core-modules/color";
import { Point, Gradient as GradientBase } from "./gradient-common";

declare var kCGGradientDrawsAfterEndLocation;

export class Gradient extends GradientBase {
    private _gradientLayer;
    private options = {
        colors: null,
        radius: null,
        center: null
    };

    constructor() {
        super();
        this._gradientLayer = RadialGradientLayer.layer();
        if (this.ios) {
            this.ios.layer.insertSublayerAtIndex(this._gradientLayer, 0);
        }
    }

    public onLayout(left: number, top: number, right: number, bottom: number): void {
        super.onLayout(left, top, right, bottom);
        this._gradientLayer.frame = this.ios.layer.bounds;
    }

    protected updateColors(colors?: Color[]): void {
        if (colors && colors.length >= 2 && this.ios && this._gradientLayer) {
            const colorsArray = NSMutableArray.alloc().initWithCapacity(colors.length);
            for (let _color of colors) {
                colorsArray.addObject(_color.ios.CGColor);
            }
            this.options.colors = colorsArray;
            this.updateView();
        }
    }

    protected updateCenter(center: Point) {
        if (center && this.ios && this._gradientLayer) {
            this.options.center = center;
            this.updateView();
        }
    }

    protected updateRadius(radius: number) {
        if (radius && this.ios && this._gradientLayer) {
            this.options.radius = radius;
            this.updateView();
        }
    }

    protected updateView() {
        this._gradientLayer.colors = this.options.colors;
        this._gradientLayer.radius = this.options.radius;
        this._gradientLayer.center = this.options.center;
        this._gradientLayer.setNeedsDisplay();
    }
}

class RadialGradientLayer extends CALayer {
    colors: NSMutableArray<any>;
    radius: number;
    center: Point;

    drawInContext(ctx) {
        if(!this.colors) return;

        const gradient = CGGradientCreateWithColors(null, this.colors, null);
        // todo: make center as range between 0 - 1 to match with android
        const center = this.center ? CGPointMake(this.center.x, this.center.y)
                                   : CGPointMake(CGRectGetMidX(this.bounds), CGRectGetMidY(this.bounds));
        const radius = this.radius ? this.radius : Math.min(this.bounds.size.width, this.bounds.size.height);
        CGContextDrawRadialGradient(ctx, gradient, center, 0, center, radius, kCGGradientDrawsAfterEndLocation);

        if(gradient){
            console.log(gradient);
            CGGradientRelease(gradient);
        }
    }
}
