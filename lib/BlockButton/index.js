'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockButton = function (_Component) {
  _inherits(BlockButton, _Component);

  function BlockButton(props) {
    _classCallCheck(this, BlockButton);

    var _this = _possibleConstructorReturn(this, (BlockButton.__proto__ || Object.getPrototypeOf(BlockButton)).call(this, props));

    _this.componentWillMount = _this.componentWillMount.bind(_this);
    _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);
    return _this;
  }

  // register with store updates to ensure rerender


  _createClass(BlockButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.bindToState(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.bindToState(this, true);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          store = _props.store,
          blockType = _props.blockType,
          label = _props.label,
          children = _props.children;

      var toggleBlockType = store.toggleBlockType.bind(store, blockType);
      var isActive = undefined;

      if (store.getEditorState) {
        var editorState = store.getEditorState();
        var selection = editorState.getSelection();
        var currentType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        isActive = currentType == blockType;
      } else {
        // editor not yet available / initialized
        isActive = false;
      }

      if (children && (typeof children === 'undefined' ? 'undefined' : _typeof(children)) == 'object') {
        var ChildInput = _react2.default.cloneElement(children, {
          toggleBlockType: toggleBlockType,
          isActive: isActive,
          label: label,
          blockType: blockType
        });

        return ChildInput;
      }

      var spanStyle = {
        color: isActive ? '#900' : '#999',
        cursor: 'pointer',
        display: 'inline-block',
        marginRight: '1em'
      };

      return _react2.default.createElement(
        'span',
        { onClick: toggleBlockType, style: spanStyle },
        label
      );
    }
  }]);

  return BlockButton;
}(_react.Component);

BlockButton.propTypes = {
  store: _propTypes2.default.object,
  bindToState: _propTypes2.default.func,
  label: _propTypes2.default.string,
  blockType: _propTypes2.default.string
};
exports.default = BlockButton;