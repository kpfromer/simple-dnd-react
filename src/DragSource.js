import React, { Component } from 'react'
import { DndContext } from './dnd-context';

class DragSource extends Component {
  componentDidMount() {
    this.props.addDragSource();
    // TODO: handle unmount
    // window.addEventListener('mousemove', (ev) => this.handleMove(ev));
    window.addEventListener('mouseup', () => this.props.isMoving(false));
    // window.addEventListener('mousedown', () => this.props.isMoving(false));
  }
  componentWillUnmount() {
    this.props.removeDragSource();
  }
  render() {
    return (
      <div onMouseDown={() => this.props.isMoving(true)} style={{userSelect: 'none'}}>
        {this.props.children(this.props.isDragging)}
      </div>
    )
  }
}

export default (props) => (
  <DndContext.Consumer>
    {(dnd) => {
      const source = dnd.sources.find(source => source.name === props.name);
      const isDragging = !!source && source.isDragging;
      return (
        <DragSource
          addDragSource={() => dnd.addDragSource(props.name)}
          removeDragSource={() => dnd.removeDragSource(props.name)}
          isMoving={dnd.isMoving(props.name)}
          isDragging={isDragging}
        >
          {props.children}
        </DragSource>
      )
    }}
  </DndContext.Consumer>
)