import { Color } from "tns-core-modules/color";
import { Gradient as GradientBase, Point } from "./gradient-common";
import { layout } from "tns-core-modules/utils/utils";

const RADIAL_GRADIENT = 1;

export class Gradient extends GradientBase {
  private _android: any;
  private _backgroundDrawable: any;

  public createNativeView() {
    this._android = new org.nativescript.widgets.StackLayout(this._context);
    this._backgroundDrawable = new android.graphics.drawable.GradientDrawable();
    this._android.setBackgroundDrawable(this._backgroundDrawable);
    return this._android;
  }

  protected updateBorderRadius(radius: number) {
    if (radius) {
      this._backgroundDrawable.setCornerRadius(radius * layout.getDisplayDensity());
    }
  }

  protected updateColors(colors?: Color[]): void {
    if (colors && colors.length >= 2 && this._android) {
      const _androidColors = [];
      for (let _color of colors) {
        _androidColors.push(_color.android);
      }
      this._backgroundDrawable.setGradientType(RADIAL_GRADIENT);
      this._backgroundDrawable.setColors(_androidColors);
    }
  }

    protected updateCenter(center: Point) {
        if (center && this._android) {
            this._backgroundDrawable.setGradientCenter(center.x, center.y);
        }
    }

    protected updateRadius(radius: number) {
        if (radius && this._android) {
            this._backgroundDrawable.setGradientRadius(radius);
        }
    }
}
