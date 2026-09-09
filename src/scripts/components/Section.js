class Section {
  constructor({ items, renderer }, classSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._classSelector = document.querySelector(classSelector);
  }

  clear() {
    this._classSelector
      .querySelectorAll(".card")
      .forEach((card) => card.remove());
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._classSelector.prepend(element);
  }
}

export default Section;
