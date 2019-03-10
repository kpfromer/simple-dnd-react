import React, { Component } from 'react'
import { DndContext } from './dnd-context';

class DropTarget extends Component {
  componentDidMount() {
    this.props.addDropTarget();
    // TODO: handle unmount
    // window.addEventListener('mousemove', (ev) => this.handleMove(ev));
    // window.addEventListener('mouseup', () => this.props.isOver(false));
    // window.addEventListener('mousedown', () => this.props.isMoving(false));
  }
  componentWillUnmount() {
    this.props.removeDropTarget();
  }
  render() {
    return (
      <div onMouseOver={() => this.props.isOver(true)} onMouseLeave={() => this.props.isOver(false)} style={{userSelect: 'none'}}>
        {this.props.children}
      </div>
    )
  }
}

export default (props) => (
  <DndContext.Consumer>
    {(dnd) => (
      <DropTarget
        addDropTarget={() => dnd.addDropTarget(props.name)}
        removeDropTarget={() => dnd.removeDropTarget(props.name)}
        isOver={dnd.isOver(props.name)}
      >
        {props.children}
      </DropTarget>
    )}
  </DndContext.Consumer>
)