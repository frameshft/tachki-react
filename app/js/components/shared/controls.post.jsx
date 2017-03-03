import React from 'react';
import { Link } from 'react-router';
import PromptDelete from './prompt.delete';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);

    this.state = {
      showPrompt: false,
    };
  }

  onDeleteClick() {
    this.setState({
      showPrompt: true,
    });
  }

  onCancelClick() {
    this.setState({
      showPrompt: false,
    });
  }

  render() {
    const { car } = this.props;
    const { showPrompt } = this.state;
    return (
      <div>
        <ul>
          <li>
            <button onClick={ this.onDeleteClick }>Удалить</button>
          </li>
          <li>
            <Link to={ `/up/${car.id}` }>Поднять объявления</Link>
          </li>
        </ul>
        { showPrompt &&
          <PromptDelete postId={ car.id } cancel={ this.onCancelClick } /> }
      </div>
    );
  }
}

Controls.propTypes = {
  car: React.PropTypes.object.isRequired,
};
