import React from 'react';
export const dnd = {
  addDragSource: () => {},
  removeDragSource: () => {},
  addDropTarget: () => {},
  removeDropTarget: () => {},
  isMoving: () => {},
  isOver: () => {},
  sources: [],
  targets: [],
};

export const DndContext = React.createContext(dnd);