import { notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import type { Item as ItemType } from '../types/Item';
// import fs from 'node:fs/promises';
import items from '../data/items.json' with { type: "json" };

export const fetchItem = createServerFn({ method: 'POST' })
  .inputValidator((d: string) => d)
  .handler(async ({ data, context }) => {
    console.log('Request context:', context);
    console.info(`Fetching item with id ${data}...`);
    const response = await fetch(`http://localhost:3000/data/items/${data}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw notFound();
      }

      throw new Error('Failed to fetch item');
    }

    const item = await response.json();

    return item as ItemType;
  });

export const fetchItems = createServerFn().handler(async () => {
  return items;
  // return JSON.parse(await fs.readFile('./data/items.json', 'utf-8'))
  // console.info('Fetching items...');
  // const response = await fetch('http://localhost:3000/data/items.json');
  // if (!response.ok) {
  //   throw new Error('Failed to fetch items');
  // }

  // const items = await response.json();

  // return items as Array<ItemType>; // .slice(0, 10);
});
