/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

$(document).ready(function(){
  var addListItem = __webpack_require__(1);
  console.log('..loading');

  var listItems =[];

  $('form').on('submit', function(event){
    event.preventDefault();
    var item_value = $('#list_item_input').val();
    var item_obj = {item_value: item_value, completed: false}
    $('#list_item_input').val('');
    addListItem(item_obj, listItems);
  })
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function addListItem(item, listItems) {
  listItems.push(item)
  renderArray(listItems);
}

function removeListItem(index, listItems) {
  listItems.splice(index, 1)
  renderArray(listItems);
}

function shiftUpItem(index, listItems) {
  if(!index) {
    return null;
  } else {
    var temp = listItems.splice(index, 1)
    listItems.splice(index-1, 0, temp[0])
    renderArray(listItems);
  }
}

function shiftDownItem(index, listItems) {
  if(index >= listItems.length -1) {
    return null;
  } else {
    var temp = listItems.splice(index, 1)
    listItems.splice(index+1, 0, temp[0])
    renderArray(listItems);
  }
}

function completeItem(index, listItems) {
  listItems[index].completed = !listItems[index].completed;
  console.log(listItems[index].completed)
  renderArray(listItems);
}

function renderArray(listItems) {
  $('tbody').remove();
  $('table').append('<tbody></tbody>')
  listItems.map(function(listItem, index){
    return (
      `<tr id="row_${index}">
        <td>${index}</td>
        <td class=${listItem.completed ? "completed" : ""}>${listItem.item_value}</td>
        <td>
          <button id="btn_complete_${index}" class="btn btn-success">Completed</button>
          <button id="btn_shift_up_${index}" type="button" class="btn btn-primary">
            Shift <span class="glyphicon glyphicon-menu-up"></span>
          </button>
          <button id="btn_shift_down_${index}" type="button" class="btn btn-primary">
            Shift <span class="glyphicon glyphicon-menu-down"></span>
          </button>
          <button id="btn_delete_${index}" class="btn btn-danger">Delete</button>
        </td>
      </tr>`
    )
  }).forEach(function(item, index){
        $('tbody').append(item);
        $(`#btn_delete_${index}`).on('click', function(e){
          console.log('delete has been clicked')
          removeListItem(index, listItems);
        })
        $(`#btn_shift_up_${index}`).on('click', function(e){
          shiftUpItem(index, listItems);
        })
        $(`#btn_shift_down_${index}`).on('click', function(e){
          shiftDownItem(index, listItems);
        })
        $(`#btn_complete_${index}`).on('click', function(e){
          completeItem(index, listItems);
        })
    })
}

module.exports = addListItem;

/***/ })
/******/ ]);