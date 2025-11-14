import type { DragEvent, FC } from 'react';
import type { Item as ItemProps } from '../types/Item';
import './Item.css';
import { Link } from '@tanstack/react-router';

export const Item: FC<ItemProps> = ({ id, title, photos }) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const id = target.getAttribute('data-id') ?? '';
    const img = new Image();
    img.src = target.querySelector('img')?.src ?? '';
    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.setDragImage(img, -15, -10);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <Link to="/items/$itemId" params={{ itemId: id }}>
      <div className="item" draggable onDragStart={onDragStart} data-id={id}>
        <img className="item" src={photos[0].thumbnails[1].url} />
        <div className="title">{title}</div>
      </div>
    </Link>
  );
};
