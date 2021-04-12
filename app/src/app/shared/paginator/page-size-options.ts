export class PageSizeOptions {
  public static readonly BASE = [5, 10, 25, 50, 100];

  public static readonly MIN_COUNT = 6;

  public static getSizeOptions(totalCount: number): number[]
  {
    if (totalCount < this.MIN_COUNT) {
      return [];
    }

    const elements: number[] =  this.BASE.filter((size: number) => totalCount > size);

    const nextElement: number = this.BASE[this.BASE.indexOf(elements[elements.length - 1]) + 1];
    elements.push(nextElement);

    return elements;
  }
}
