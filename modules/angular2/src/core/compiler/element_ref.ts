import {BaseException} from 'angular2/src/core/facade/exceptions';
import {ViewRef} from './view_ref';
import {RenderViewRef, RenderElementRef, Renderer} from 'angular2/src/core/render/api';

/**
 * An opaque reference to the underlying element.
 *
 * The underlying native element is a DOM Element in a browser context, but may represent other
 * types on other rendering platforms. In the browser the `ElementRef` can be sent to the Web
 * Worker. Web Workers can not have references to the DOM Elements.
 */
export class ElementRef implements RenderElementRef {
  /**
   * Reference to the {@link ViewRef} where the `ElementRef` is inside of.
   */
  parentView: ViewRef;


  /**
   * Index of the element inside the {@link ViewRef}.
   *
   * This is used internally by the Angular framework to locate elements.
   */
  boundElementIndex: number;

  /**
   * Index of the element inside the `RenderViewRef`.
   *
   * This is used internally by the Angular framework to locate elements.
   */
  renderBoundElementIndex: number;

  constructor(parentView: ViewRef, boundElementIndex: number, renderBoundElementIndex: number,
              private _renderer: Renderer) {
    this.parentView = parentView;
    this.boundElementIndex = boundElementIndex;
    this.renderBoundElementIndex = renderBoundElementIndex;
  }

  /**
   *
   */
  get renderView(): RenderViewRef { return this.parentView.render; }

  // TODO(tbosch): remove this once Typescript supports declaring interfaces
  // that contain getters
  // https://github.com/Microsoft/TypeScript/issues/3745
  set renderView(viewRef: RenderViewRef) { throw new BaseException('Abstract setter'); }

  /**
   * Returns the native Element implementation.
   *
   * In the browser this represents the DOM element.
   *
   * The `nativeElement` can be used as an escape hatch when direct DOM manipulation is needed. Use
   * this with caution, as it creates tight coupling between your application and the browser, which
   * will not work in Web Workers.
   *
   * NOTE: This method will return null in the webworker scenario!
   */
  get nativeElement(): any { return this._renderer.getNativeElementSync(this); }
}
