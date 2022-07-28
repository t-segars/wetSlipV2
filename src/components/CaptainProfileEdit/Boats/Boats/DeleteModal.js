import React from 'react';
import { Button, Dropdown, Header, Icon, Modal } from 'semantic-ui-react';
import { deleteBoat } from '../../../../firebase/firebase';
import { connect } from 'react-redux';

class DeleteModal extends React.Component {
  state = { open: false };

  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <Modal
        trigger={<Dropdown.Item text="De-activate" onClick={this.show} />}
        basic
        size="small"
        open={this.state.open}
        onClose={this.close}
      >
        <Header icon="archive" content="De-activate Boat" />
        <Modal.Content>
          <p>Are you sure you want to delete your boat?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={this.close}>
            <Icon name="remove" /> No
          </Button>
          <Button
            color="green"
            inverted
            onClick={async () => {
              await deleteBoat(
                this.props.currentUser.id,
                this.props.data.randomId
              );
              this.props.handleDelete(this.props.data);
              this.close();
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps)(DeleteModal);
