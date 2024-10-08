"use client";

import { useEffect, useState } from "react";
import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";
import { useToast } from "@/hooks/use-toast";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const { toast } = useToast();
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess() {
      toast({
        description: "List Reordered",
        variant: "success",
      });
    },
    onError(err) {
      toast({
        description: err,
        variant: "destructive",
      });
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess() {
      toast({
        description: "Card Reordered in Same List",
        variant: "success",
      });
    },
    onError(err) {
      toast({
        description: err,
        variant: "destructive",
      });
    },
  });

  const { execute: executeUpdateCardOrderToAnotherList } = useAction(
    updateCardOrder,
    {
      onSuccess() {
        toast({
          description: "Card Reordered in Another List",
          variant: "success",
        });
      },
      onError(err) {
        toast({
          description: err,
          variant: "destructive",
        });
      },
    }
  );

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    // if Drop in Same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // user moves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      executeUpdateListOrder({ boardId, items });
    }

    // user moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      // source and destination List
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      // check if card exists in source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      // check if card exists in dest list
      if (!destList.cards) {
        destList.cards = [];
      }

      // moving the card in same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId,
          items: reorderedCards,
        });

        // User moves card to another list
      } else {
        // remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        //  assaign the new listId to the moved Card
        movedCard.listId = destination.droppableId;
        // Add card to destination list
        destList.cards.splice(destination.index, 0, movedCard);
        // update the order of cards
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        // Update the order of cards in destination list
        destList.cards.forEach((card, index) => {
          card.order = index;
        });
        setOrderedData(newOrderedData);
        executeUpdateCardOrderToAnotherList({
          boardId,
          items: destList.cards,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}

            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
