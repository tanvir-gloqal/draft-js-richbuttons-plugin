'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StyleButton = require('./StyleButton');

var _StyleButton2 = _interopRequireDefault(_StyleButton);

var _BlockButton = require('./BlockButton');

var _BlockButton2 = _interopRequireDefault(_BlockButton);

var _draftJs = require('draft-js');

var _types = require('./config/types');

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var richButtonsPlugin = function richButtonsPlugin() {
  var store = {
    getEditorState: undefined,
    setEditorState: undefined,
    currentState: undefined,

    onChange: function onChange(newState) {
      if (newState !== this.currentState) {
        this.currentState = newState;
        this.notifyBound();
      }
      return newState;
    },

    // buttons must be subscribed explicitly to ensure rerender
    boundComponents: [],
    bindToState: function bindToState(component, remove) {
      if (remove) {
        this.boundComponents = this.boundComponents.filter(function (registered) {
          return registered !== component;
        });
      } else {
        this.boundComponents.push(component);
      }
    },
    notifyBound: function notifyBound() {
      this.boundComponents.forEach(function (component) {
        return component.forceUpdate();
      });
    },

    toggleInlineStyle: function toggleInlineStyle(inlineStyle) {
      var state = this.getEditorState();
      var newState = _draftJs.RichUtils.toggleInlineStyle(state, inlineStyle);
      this.setEditorState(newState);
    },

    toggleBlockType: function toggleBlockType(blockType) {
      var state = this.getEditorState();
      var newState = _draftJs.RichUtils.toggleBlockType(state, blockType);
      this.setEditorState(_draftJs.EditorState.forceSelection(newState, newState.getCurrentContent().getSelectionAfter()));
    }
  };

  var configured = {
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;

      store.currentState = getEditorState();
      store.getEditorState = function () {
        return store.currentState;
      };
      store.setEditorState = function (newState) {
        store.onChange(newState);
        setEditorState(newState);
      };
    },

    handleKeyCommand: function handleKeyCommand(editorState, command) {
      return _draftJs.RichUtils.handleKeyCommand(editorState, command);
    },

    onTab: function onTab(event, editor) {
      return _draftJs.RichUtils.onTab(event, editor.getEditorState(), _types.MAX_LIST_DEPTH);
    },

    onChange: function onChange(newState) {
      return store.onChange(newState);
    }
  };

  _types.INLINE_STYLES.forEach(function (inlineStyle) {
    configured[inlineStyle.label + 'Button'] = (0, _decorateComponentWithProps2.default)(_StyleButton2.default, {
      store: store,
      bindToState: store.bindToState.bind(store),
      label: inlineStyle.label,
      inlineStyle: inlineStyle.style
    });
  });

  _types.BLOCK_TYPES.forEach(function (blockType) {
    configured[blockType.label + 'Button'] = (0, _decorateComponentWithProps2.default)(_BlockButton2.default, {
      store: store,
      bindToState: store.bindToState.bind(store),
      label: blockType.label,
      blockType: blockType.style
    });
  });

  configured.createBlockButton = function (_ref2) {
    var type = _ref2.type,
        label = _ref2.label;
    return (0, _decorateComponentWithProps2.default)(_BlockButton2.default, {
      store: store,
      bindToState: store.bindToState.bind(store),
      label: label,
      blockType: type
    });
  };

  configured.createStyleButton = function (_ref3) {
    var style = _ref3.style,
        label = _ref3.label;
    return (0, _decorateComponentWithProps2.default)(_StyleButton2.default, {
      store: store,
      bindToState: store.bindToState.bind(store),
      label: label,
      inlineStyle: style
    });
  };

  return configured;
};

exports.default = richButtonsPlugin;