import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const {destination, source, draggableId } = result;

  if(!destination) {
    return;
  }

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return;
  }

  const {taskIds, tasks } = this.state
  const newTaskIds = [...taskIds]
  const newTasks = [... tasks]
  newTaskIds.splice(source.index, 1);
  newTaskIds.splice(destination.index, 0, draggableId);
// set current task
  const draggable = newTasks.splice(source.index,1)
  newTasks.splice(destination.index, 0, ...draggable);

  const newState = {
    ...this.state,
    taskIds: newTaskIds,
    tasks: newTasks 
  };

  this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Column tasks={this.state.tasks} />
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
