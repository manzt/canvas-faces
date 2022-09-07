javascript:
(function () {
  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  /* Select all images from canvas table */
  let images = Array.from(document.querySelectorAll("td img"));
  shuffle(images);

  let overlay = document.createElement("div");
  let close = () => overlay.parentNode.removeChild(overlay);
  Object.assign(overlay.style, {
    margin: 0,
    position: "fixed",
    top: "0px",
    height: "100%",
    width: "100%",
    display: "grid",
    placeItems: "center",
    alignContent: "center",
    backdropFilter: "blur(5px)",
    zIndex: 1000,
  });
  overlay.onclick = (e) => {
    if (e.target === overlay) close();
  };

  let i = 0;
  let img = Object.assign(document.createElement("img"), { width: 250 });
  let button = Object.assign(document.createElement("button"), {
    onclick: function () {
      let next = images[i];
      if (!next) {
        close();
        return;
      }
      img.src = next.src;
      img.title = next.alt;
      this.innerHTML = `Next (${i + 1}/${images.length})`;
      i++; /* progress to the next image */
    },
  });

  overlay.appendChild(img);
  overlay.appendChild(button);
  document.body.appendChild(overlay);
  button.click();
})();
