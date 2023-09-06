export class Section {
  constructor({ renderer, selector }) {
    this._renderer = renderer;
    this._selector = selector;
  }
  renderItem(items) {
    this._renderedItems = items;
    this._renderedItems.forEach((item) => this._renderer(item));
  }
  addItem(element) {
    this._selector.prepend(element);
  }
}
