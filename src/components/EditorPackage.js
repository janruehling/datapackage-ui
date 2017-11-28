const React = require('react')
const {Table} = require('tableschema')
const classNames = require('classnames')
const {connect} = require('react-redux')
const cloneDeep = require('lodash/cloneDeep')
const {EditorSidebar} = require('./EditorSidebar')
const {EditorPreview} = require('./EditorPreview')
const {EditorResource} = require('./EditorResource')
const {createReducer} = require('../reducers/editorPackage')


// Components

function EditorPackage({

  // Store
  feedback,
  descriptor,
  isPreviewActive,

  // Handlers
  onAddResourceClick,

}) {
  return (
    <div className={classNames('app', 'datapackage-ui', {'code-view': isPreviewActive})}>

      {/* Sidebar */}
      <EditorSidebar
        descriptor={descriptor}
      />

      <section className="resources">

        {/* Feedback */}
        {feedback &&
          <div className={`alert alert-${feedback.type}`} role="alert">
            <p>{feedback.text}</p>
            <ul>
              {(feedback.messages || []).map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>
        }

        {/* Resources */}
        <div>
          <header className="section-heading">
            <h2>Resources</h2>
          </header>

          {/* List resources */}
          <div className="panel-group" id="resources-data" role="tablist" aria-multiselectable="true">
            {(descriptor.resources || []).map((descriptor, resourceIndex) => (
              <EditorResource
                descriptor={descriptor}
                isSettingsActive={false}
                resourceIndex={resourceIndex}
                key={resourceIndex}
              />
            ))}
          </div>

          {/* Add resource */}
          <a className="add resource" onClick={onAddResourceClick}>
            <svg><use xlinkHref="#icon-plus" /></svg>
            Add resource
          </a>
        </div>

      </section>

      {/* Preview */}
      <EditorPreview
        descriptor={descriptor}
      />

    </div>
  )
}


// State

const mapStateToProps = (state, ownProps) => ({

  isPreviewActive:
    state.isPreviewActive,

  descriptor:
    state.descriptor,

  feedback:
    state.feedback,

})


// Handlers

const mapDispatchToProps = (dispatch, ownProps) => ({

  onAddResourceClick:
    (ev) => {
      dispatch({
        type: 'ADD_RESOURCE',
      })
    },

})


// Wrappers

EditorPackage = connect(mapStateToProps, mapDispatchToProps)(EditorPackage)
EditorPackage.editorType = 'package'
EditorPackage.createReducer = createReducer


// System

module.exports = {
  EditorPackage,
}
