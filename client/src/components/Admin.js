import React, { Component } from "react";
import styled from "styled-components";
import Accordion from "./Accordion";
import { Button, Input } from "./common";

const MentorInfo = styled.div`
  padding: 20px;
  display: inline-block;
  background-color: yellowgreen;
  font-weight: 700;
  font-size: 22px;
`;

const FormContainer = styled.div`
  display: ${props => props.display};
  padding: 18px;
  border: 1px solid teal;
  margin-bottom: 12px;
`;

class Admin extends Component {
  state = {
    data: [],
    addMentor: false
  };
  componentDidMount() {
    fetch("api/mentor/all/")
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({ data: [...response.result] });
        }
      });
  }

  renderMentorInfo = () => {
    return <MentorInfo>{this.state.data.length} Mentors available!</MentorInfo>;
  };

  handleDeleteTask = (email, taskId) => {
    fetch("/api/task/", {
      method: "DELETE",
      body: JSON.stringify({ email: email, taskId: taskId }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          let dataIndex = this.state.data.findIndex(obj => obj.email === email);
          let data = this.state.data[dataIndex];
          let taskIndex = data.Task.findIndex(obj => obj.taskId === taskId);
          data.Task.splice(taskIndex, 1);
          this.state.data[dataIndex] = data;
          this.setState({ data: [...this.state.data] });
        }
      });
  };

  handleAddTask = (email, task) => {
    fetch("/api/task/", {
      method: "POST",
      body: JSON.stringify({ email: email, taskName: task }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          let dataIndex = this.state.data.findIndex(obj => obj.email === email);
          let data = this.state.data[dataIndex];
          data.Task.push({
            taskName: task,
            taskId:
              data.Task.length > 0
                ? data.Task[data.Task.length - 1].taskId + 1
                : 1
          });
          this.state.data[dataIndex] = data;
          this.setState({ data: [...this.state.data] });
        }
      });
  };

  handleAddMentor = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    fetch("/api/mentor/", {
      method: "POST",
      body: JSON.stringify({ email: email, name: name }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({
            data: [...this.state.data, { ...response.result }],
            addMentor: false
          });
        }
      });
  };

  renderAddMentor = () => {
    return (
      <FormContainer display={this.state.addMentor ? "inline-block" : "none"}>
        <Input
          id="name"
          type="text"
          marginBottom="16px"
          placeholder="Enter mentor name"
        />
        <Input
          marginBottom="16px"
          id="email"
          type="email"
          placeholder="Enter email"
        />
        <Button marginLeft="4px" onClick={this.handleAddMentor}>
          Add
        </Button>
      </FormContainer>
    );
  };

  handleAddMentorClick = () => {
    this.setState({
      addMentor: true
    });
  };

  render() {
    return (
      <>
        <h1>Hello Admin</h1>
        <Button marginBottom={"8px"} onClick={this.handleAddMentorClick}>
          Add Mentor
        </Button>
        {this.renderAddMentor()}
        {this.renderMentorInfo()}
        {this.state.data.map(obj => {
          return (
            <Accordion
              {...obj}
              taskList={obj.Task}
              handleDeleteTask={this.handleDeleteTask}
              handleAddTask={this.handleAddTask}
            />
          );
        })}
      </>
    );
  }
}

export default Admin;
