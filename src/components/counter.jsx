import React, { Component } from "react";

class Counter extends Component {
  state = {
    value: this.props.counter.value,
    tags: ["tag1", "tag2", "tag3"],
  };
  styles = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  render() {
    return (
      <React.Fragment>
        <span style={this.styles} className={this.getBadgeClasses()}>
          Count {this.formatCount()}
        </span>
        <button
          onClick={() => {
            this.props.onIncrement(this.props.counter);
          }}
          className="btn btn-secondary btn-sm m-2"
        >
          Increment
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => {
            this.props.onDelete(this.props.counter.id);
          }}
        >
          Delete
        </button>
        {this.renderTags()}
      </React.Fragment>
    );
  }

  renderTags() {
    if (this.state.tags.length === 0) {
      return <p>There are no tags.</p>;
    } else {
      return (
        <ul>
          {this.state.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      );
    }
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
