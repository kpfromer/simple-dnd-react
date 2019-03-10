import React, { Component } from 'react'
import { DndContext, dnd } from './dnd-context';

export default class DragDropContainer extends Component {
  constructor(props) {
    super(props);

    const dragdrop = {
      ...dnd,
      addDropTarget: this.addDropTarget,
      removeDropTarget: this.removeDropTarget,
      addDragSource: this.addDragSource,
      removeDragSource: this.removeDragSource,
      isMoving: this.handleDrag,
      isOver: this.handleOver
    }

    this.state = {
      dragdrop,
      sources: [],
      targets: []
    }
  }
  addDragSource = (name) =>
    this.setState({
      sources: [
        ...this.state.sources,
        {
          name,
          isDragging: false
        }
      ]
    })
  removeDragSource = (name) =>
    this.setState({
      sources: this.state.sources.filter(source => source.name !== name)
    })
  addDropTarget = (name) =>
    this.setState({
      targets: [
        ...this.state.targets,
        {
          name,
          isOver: false
        }
      ]
    })
  removeDropTarget = (name) =>
    this.setState({
      targets: this.state.targets.filter(target => target.name !== name)
    })
  // TODO: inefficient (this will always set state if nothing changes!)
  handleDrag = (name) => (isDragging) =>
    this.setState({
      sources: this.state.sources.map(source => {
        if (source.name === name) {
          const targetOver = this.state.targets.find(target => target.isOver);
          if (source.isDragging && !isDragging && !!targetOver) { // Was dragging but done dragging
            this.props.onDrop(name, targetOver.name);
          }
          return {
            ...source,
            isDragging
          }
        }
        return source;
      })
    })
  // TODO: inefficient (this will always set state if nothing changes!)
  handleOver = (name) => (isOver) =>
    this.setState({
      targets: this.state.targets.map(target => {
        if (target.name === name) {
          return {
            ...target,
            isOver
          }
        }
        return target;
      })
    });
  render() {
    const dnd = {
      ...this.state.dragdrop,
      sources: this.state.sources
    }
    return (
      <DndContext.Provider value={dnd}>
        {this.props.children}
      </DndContext.Provider>
    )
  }
}
