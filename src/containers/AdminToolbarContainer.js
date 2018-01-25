import { connect } from 'react-redux'
import { toggleEditing, savePage, toggleNewPageModal, createPage } from '../redux/actions'
import AdminToolbar from '../components/AdminToolbar'

const mapStateToProps = (state, ownProps) => {
  const allowEditing = state.adminTools.userRoles && state.adminTools.userRoles.includes('Editor')
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    isEditingPage: state.adminTools.isEditingPage,
    content: state.content,
    pageData: state.pageData,
    allowEditing: allowEditing,
    showNewPageModal: state.adminTools.showNewPageModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleEditing: () => {
      dispatch(toggleEditing())
    },
    onToggleNewPageModal: () => {
      dispatch(toggleNewPageModal())
    },
    createPage: (pageData, token) => {
      dispatch(createPage(pageData, token))
    },
    savePage: (pageData, content, token) => {
      dispatch(savePage(pageData, content, token))
    }
  }
}

const AdminToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminToolbar)

export default AdminToolbarContainer;