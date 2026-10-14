import "@testing-library/jest-dom/vitest";

class ResizeObserverMock implements ResizeObserver {
  private observedElements = new Set<Element>();

  observe(target: Element, _options?: ResizeObserverOptions): void {
    this.observedElements.add(target);
  }

  unobserve(target: Element): void {
    this.observedElements.delete(target);
  }

  disconnect(): void {
    this.observedElements.clear();
  }
}

globalThis.ResizeObserver = ResizeObserverMock;