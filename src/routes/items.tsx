import { createFileRoute } from '@tanstack/react-router';
import { fetchItems } from '../utils/items';
import { Item } from '../components/Item';
import './items.css';

export const Route = createFileRoute('/items')({
  loader: async () => fetchItems(),
  component: ItemsComponent,
});

function ItemsComponent() {
  const items = Route.useLoaderData();

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.dropEffect = 'move';
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    console.log('Dropped item ID:', id);
  };

  return (
    <div className="items-container">
      <div className="box" onDragOver={onDragOver} onDrop={onDrop}></div>
      <div className="items">
        {items.map((item) => (
          <Item {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
