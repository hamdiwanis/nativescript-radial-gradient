# NativeScript Radial Gradient 🎨

> Note: This Plugin based on [EddyVerbruggen](https://github.com/EddyVerbruggen) linear gradient plugin.

<img src="https://github.com/hamdiwanis/nativescript-radial-gradient/raw/master/screenshots/demo.jpg" height="364px" />

## Installation
```bash
tns plugin add nativescript-radial-gradient
```

### Example
```html
<Gradientcolors="#FF0077, red, #FF00FF" borderRadius="20" center="{x: 0: y: 0}">
  <Label class="p-20 c-white" horizontalAlignment="center" text="My gradients are the best." textWrap="true"></Label>
  <Label class="p-10 c-white" horizontalAlignment="center" text="It's true." textWrap="true"></Label>
</Gradient>
```

## Usage
Since we're subclassing `StackLayout`, you can add `<Gradient>` to your view at any place where you'd otherwise use a `StackLayout`.

In addition to any properties you can already set on a `StackLayout` you should add:

|Param| Description |
|---|---|
|colors| Pass a minimum number of two. Just use the `value` that you would otherwise pass to NativeScript's [`new Color("value")`](https://docs.nativescript.org/api-reference/classes/_color_.color.html). So `red`, `#FF0000`, `rgb(255, 0, 0)`, and even `rgba(255, 0, 0, 0.5)` ([transparency!](https://github.com/EddyVerbruggen/nativescript-gradient/issues/2)) will all work.|
|radius| the radius the radial gradient|
|center| the center point the radial gradient {x: number,y: number}|

### Angular
Add this to `app.module.ts` so you can use a `Gradient` tag in the view:

```typescript
import { registerElement } from "nativescript-angular";
registerElement("Gradient", () => require("nativescript-radial-gradient").Gradient);
```

### How many `colors` can we pass to the plugin?
Knock yourself out, but the minimum is two.

## Next
- [x] implement radial gradient.
- [ ] handel default values better.

## Contribute
if you want to help improve the plugin you can consider it yours and make as PRs as you want :)

## Get Help
Please, use [github issues](https://github.com/hamdiwanis/nativescript-rotate-3d/issues) strictly for [reporting bugs](CONTRIBUTING.md#reporting-bugs) or [requesting features](CONTRIBUTING.md#requesting-new-features).

## Contact
Twitter: [hamdiwanis](https://twitter.com/hamdiwanis)  \
Email: hamdiwanis@hotmail.com