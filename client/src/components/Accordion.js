import React, { Component } from "react";
import styled from "styled-components";
import { Button, Input } from "./common";
const Details = styled.details`
  background-color: aliceblue;
  margin: 12px 0;
`;

const Summary = styled.summary`
  padding: 8px 12px 8px 12px;
  font-size: 18px;
  font-weight: bold;
  background-color: lavender;
  color: brown;
`;

const ActionButton = styled.div`
  position: absolute;
  right: 8px;
  top: 0;
  font-size: 24px;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 12px;
  margin: 0;
`;

const Li = styled.li`
  display: ${props => (props.display ? props.display : "block")};
  position: relative;
  font-size: 15px;
  padding: 8px 0;
`;

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      addTask: false
    };
  }

  handleAddTask = mentorId => {
    this.setState({ addTask: false });
    let value = document.getElementById("task_input-" + mentorId).value;
    this.props.handleAddTask(this.state.email, value);
  };

  handleAddClick = () => {
    this.setState({
      addTask: true
    });
  };

  renderInputBox = mentorId => {
    return (
      <Li display={this.state.addTask ? "block" : "none"}>
        <Input type="text" id={`task_input-${mentorId}`} />
        <Button onClick={() => this.handleAddTask(mentorId)}>Add</Button>
      </Li>
    );
  };

  render() {
    let { name, Task, email, mentorId } = this.props;
    return (
      <Details>
        <Summary id={mentorId}>
          {name} ({Task.length} tasks assigned)
        </Summary>
        <Ul>
          {Task.length > 0 ? (
            Task.map(task => (
              <Li>
                {task.taskName}
                <ActionButton
                  onClick={() => {
                    this.props.handleDeleteTask(email, task.taskId);
                  }}
                  title="delete task"
                >
                  -
                </ActionButton>
              </Li>
            ))
          ) : (
            <Li>No Task Assigned</Li>
          )}
          <Li>
            Assign a New Task{" "}
            <ActionButton onClick={this.handleAddClick}>+</ActionButton>
          </Li>
          {this.renderInputBox(mentorId)}
        </Ul>
      </Details>
    );
  }
}

export default Accordion;
