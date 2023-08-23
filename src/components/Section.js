export class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._selector = selector;
  }
  renderItem() {
    this._renderedItems.forEach(item => this._renderer(item))
  }
  addItem(element) {
    this._selector.prepend(element);
  }
}
