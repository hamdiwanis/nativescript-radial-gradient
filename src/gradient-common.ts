import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { Color } from "tns-core-modules/color";
import { Property } from "tns-core-modules/ui/core/view";

export interface Point {
    x: number,
    y: number
}

const radiusProperty = new Property<Gradient, number>({
  name: "radius",
});

const centerProperty = new Property<Gradient, Point>({
    name: "center",
});

const colorsProperty = new Property<Gradient, string>({
  name: "colors"
});

export abstract class Gradient extends StackLayout {

  [colorsProperty.setNative](value?: string) {
    if (value) {
      const _colors: Color[] = [];
      // split color codes separated with a comma. Skip commas within parenthesis -> rgba(255,0,0,1) is a color code
      const _colorsCodes = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

      for (let _colorCode of _colorsCodes) {
        if (Color.isValid(_colorCode.trim())) {
          _colors.push(new Color(_colorCode.trim()));
        }
      }
      this.updateColors(_colors);
    }
  }

    [radiusProperty.setNative](value?: number) {
        if (value) {
            this.updateRadius(value);
        }
    }

    [centerProperty.setNative](value?: Point) {
        if (value) {
            this.updateCenter(value);
        }
    }


  protected abstract updateCenter(center: Point);
  protected abstract updateRadius(radius: number);
  protected abstract updateColors(colors: Color[]);
}

colorsProperty.register(Gradient);
centerProperty.register(Gradient);
radiusProperty.register(Gradient);
