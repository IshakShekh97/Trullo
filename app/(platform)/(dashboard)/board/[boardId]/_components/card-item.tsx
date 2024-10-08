"use client";
import { Card } from "@prisma/client";

import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps {
  data: Card;
  index: number;
}

const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="truncate border-2 border-transparent hover:border-primary py-2 px-3 text-sm bg-slate-300  dark:bg-zinc-700 rounded-md shadow-sm  "
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
