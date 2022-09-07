# canvas-faces

A [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet) to learn names and
faces on Canvas. All credit to [@pieterjanvc](https://github.com/pieterjanvc) for
the idea!

## Getting started

Create a new bookmark in your browser and copy the following as the URL,

```javascript
javascript:(function() {/* Randomize array in-place using Durstenfeld shuffle algorithm */function shuffle(array) {  for (let i = array.length - 1; i > 0; i--) {    let j = Math.floor(Math.random() * (i + 1));    let temp = array[i];    array[i] = array[j];    array[j] = temp;  }}/* Select all images from canvas table */let images = Array.from(document.querySelectorAll("td img"));shuffle(images);let overlay = document.createElement("div");let close = () => overlay.parentNode.removeChild(overlay);Object.assign(overlay.style, {  margin: 0,  position: "fixed",  top: "0px",  height: "100%",  width: "100%",  display: "grid",  placeItems: "center",  alignContent: "center",  backdropFilter: "blur(5px)",  zIndex: 1000,});overlay.onclick = (e) => {  if (e.target === overlay) close();};let i = 0;let img = Object.assign(document.createElement("img"), { width: 250 });let button = Object.assign(document.createElement("button"), {  onclick: function () {    let next = images[i];    if (!next) {      close();      return;    }    img.src = next.src;    img.title = next.alt;    this.innerHTML = `Next (${i + 1}/${images.length})`;    i++; /* progress to the next image */  },});overlay.appendChild(img);overlay.appendChild(button);document.body.appendChild(overlay);button.click();})();
```

Navigate to Canvas and select the "People" page for one of your courses. Click
your new bookmark to run the bookmarklet.

![Student profile picture in modal overlaying Canvas](https://user-images.githubusercontent.com/24403730/188938727-f846f0c9-7f47-43e0-86b5-0b3ac759c46b.png)

Cycle through to test your recall of individual names, and hover over their
picture for the answer if you forget.

You may exit by clicking outside the modal or the modal will close automatically
after cycling through all individuals.

## Development

The bookmarklet URL is generated from `bookmarklet.js` by stripping the new line characters `\n`, e.g.,

```bash
cat bookmarklet.js | tr -d '\n' | pbcopy
```
