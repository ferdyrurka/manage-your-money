import {Injectable} from '@angular/core';

@Injectable()
export class SlugFactory {
  public getParsedSlugs(rawSlugs: {slug: string}[]): string[] {
    const result: string[] = [];

    rawSlugs.forEach((rawSlug: {slug: string}) => {
      result.push(rawSlug.slug);
    });

    return result;
  }
}
