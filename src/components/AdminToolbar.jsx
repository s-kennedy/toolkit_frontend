import React from 'react';
import PropTypes from 'prop-types';
import AuthService from '../utils/AuthService'

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Modal } from 'reactstrap';

import { savePage } from '../utils/API';

const styles = {
  toolbar: {
    backgroundColor: '#9A3324',
    color: '#FFF'
  },
  saveBtn: {
    backgroundColor: '#009CA6',
    color: '#FFF'
  },
  navButton: {
    marginRight: '6px'
  }
}

export default class AdminToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.auth = new AuthService();
    this.savePageToDatabase = () => this._savePageToDatabase();
    this.createPage = () => this._createPage();
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  _savePageToDatabase () {
    const token = this.auth.getToken();
    this.props.savePage(this.props.pageData, this.props.content, token)
  }

  _createPage() {
    const token = this.auth.getToken();
    this.props.createPage(this.state.newPage, token)
  }

  render() {
    if (this.props.isLoggedIn && this.props.allowEditing) {
      const editingText = this.props.isEditingPage ? 'Stop editing' : 'Edit this page';

      return (
        <div>
          <Navbar style={styles.toolbar} expand="md">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem style={styles.navButton}>
                  <Button color='white' onClick={this.props.onToggleEditing}>{editingText}</Button>
                </NavItem>
                <NavItem>
                  { this.props.isEditingPage && <Button style={styles.saveBtn} onClick={this.savePageToDatabase}>Save changes</Button> }
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Modal isOpen={this.props.showNewPageModal}>
            <div>
              <Button onClick={this.props.onToggleNewPageModal}>x</Button>
            </div>
            <div>
              Select page type
            </div>
            <div>
              Page Title
            </div>
            <div>
              Page belongs to
            </div>
            <div>
              <Button onClick={this.createPage}>Create Page</Button>
            </div>
          </Modal>
        </div>
      );
    } else {
      return <div></div>
    }
  }
}