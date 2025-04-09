"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_components_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/components/theme */ \"(pages-dir-node)/./src/components/theme.tsx\");\n\n\nconst MyApp = ({ Component, pageProps })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_src_components_theme__WEBPACK_IMPORTED_MODULE_1__.ThemeProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"D:\\\\workspace\\\\Sice-project\\\\frontend\\\\pages\\\\_app.tsx\",\n            lineNumber: 6,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"D:\\\\workspace\\\\Sice-project\\\\frontend\\\\pages\\\\_app.tsx\",\n        lineNumber: 5,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXdEO0FBRXhELE1BQU1DLFFBQVEsQ0FBQyxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBc0M7SUFDekUscUJBQ0UsOERBQUNILGdFQUFhQTtrQkFDWiw0RUFBQ0U7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUc5QjtBQUVBLGlFQUFlRixLQUFLQSxFQUFDIiwic291cmNlcyI6WyJEOlxcd29ya3NwYWNlXFxTaWNlLXByb2plY3RcXGZyb250ZW5kXFxwYWdlc1xcX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3RoZW1lJztcclxuXHJcbmNvbnN0IE15QXBwID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogeyBDb21wb25lbnQ6IGFueTsgcGFnZVByb3BzOiBhbnkgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VGhlbWVQcm92aWRlcj5cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgPC9UaGVtZVByb3ZpZGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcclxuIl0sIm5hbWVzIjpbIlRoZW1lUHJvdmlkZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./src/components/theme.tsx":
/*!**********************************!*\
  !*** ./src/components/theme.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nconst ThemeProvider = ({ children })=>{\n    const [isDarkMode, setIsDarkMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // Default to false during SSR\n    const toggleDarkMode = ()=>{\n        setIsDarkMode((prev)=>!prev);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ThemeProvider.useEffect\": ()=>{\n            if (false) {}\n        }\n    }[\"ThemeProvider.useEffect\"], []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ThemeProvider.useEffect\": ()=>{\n            if (false) {}\n        }\n    }[\"ThemeProvider.useEffect\"], [\n        isDarkMode\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            isDarkMode,\n            toggleDarkMode\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"D:\\\\workspace\\\\Sice-project\\\\frontend\\\\src\\\\components\\\\theme.tsx\",\n        lineNumber: 36,\n        columnNumber: 5\n    }, undefined);\n};\nconst useTheme = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);\n    if (context === undefined) {\n        throw new Error('useTheme must be used within a ThemeProvider');\n    }\n    return context;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9jb21wb25lbnRzL3RoZW1lLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXlGO0FBT3pGLE1BQU1LLDZCQUFlSixvREFBYUEsQ0FBK0JLO0FBRTFELE1BQU1DLGdCQUFtRCxDQUFDLEVBQUVDLFFBQVEsRUFBRTtJQUMzRSxNQUFNLENBQUNDLFlBQVlDLGNBQWMsR0FBR1IsK0NBQVFBLENBQVUsUUFBUSw4QkFBOEI7SUFFNUYsTUFBTVMsaUJBQWlCO1FBQ3JCRCxjQUFjRSxDQUFBQSxPQUFRLENBQUNBO0lBQ3pCO0lBRUFULGdEQUFTQTttQ0FBQztZQUNSLElBQUksS0FBNkIsRUFBRSxFQU1sQztRQUNIO2tDQUFHLEVBQUU7SUFFTEEsZ0RBQVNBO21DQUFDO1lBQ1IsSUFBSSxLQUE2QixFQUFFLEVBSWxDO1FBQ0g7a0NBQUc7UUFBQ007S0FBVztJQUVmLHFCQUNFLDhEQUFDSixhQUFhbUIsUUFBUTtRQUFDQyxPQUFPO1lBQUVoQjtZQUFZRTtRQUFlO2tCQUN4REg7Ozs7OztBQUdQLEVBQUU7QUFFSyxNQUFNa0IsV0FBVztJQUN0QixNQUFNQyxVQUFVdkIsaURBQVVBLENBQUNDO0lBRTNCLElBQUlzQixZQUFZckIsV0FBVztRQUN6QixNQUFNLElBQUlzQixNQUFNO0lBQ2xCO0lBRUEsT0FBT0Q7QUFDVCxFQUFFIiwic291cmNlcyI6WyJEOlxcd29ya3NwYWNlXFxTaWNlLXByb2plY3RcXGZyb250ZW5kXFxzcmNcXGNvbXBvbmVudHNcXHRoZW1lLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ29udGV4dCwgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW50ZXJmYWNlIFRoZW1lQ29udGV4dFR5cGUge1xyXG4gIGlzRGFya01vZGU6IGJvb2xlYW47XHJcbiAgdG9nZ2xlRGFya01vZGU6ICgpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmNvbnN0IFRoZW1lQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8VGhlbWVDb250ZXh0VHlwZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcclxuXHJcbmV4cG9ydCBjb25zdCBUaGVtZVByb3ZpZGVyOiBSZWFjdC5GQzx7IGNoaWxkcmVuOiBSZWFjdE5vZGUgfT4gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XHJcbiAgY29uc3QgW2lzRGFya01vZGUsIHNldElzRGFya01vZGVdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpOyAvLyBEZWZhdWx0IHRvIGZhbHNlIGR1cmluZyBTU1JcclxuXHJcbiAgY29uc3QgdG9nZ2xlRGFya01vZGUgPSAoKSA9PiB7XHJcbiAgICBzZXRJc0RhcmtNb2RlKHByZXYgPT4gIXByZXYpO1xyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3Qgc3RvcmVkRGFya01vZGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0RhcmtNb2RlJykgfHwgJ2ZhbHNlJyk7XHJcbiAgICAgIHNldElzRGFya01vZGUoc3RvcmVkRGFya01vZGUpO1xyXG5cclxuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycsIHN0b3JlZERhcmtNb2RlKTtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycsIGlzRGFya01vZGUpO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNEYXJrTW9kZScsIEpTT04uc3RyaW5naWZ5KGlzRGFya01vZGUpKTtcclxuICAgIH1cclxuICB9LCBbaXNEYXJrTW9kZV0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFRoZW1lQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyBpc0RhcmtNb2RlLCB0b2dnbGVEYXJrTW9kZSB9fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9UaGVtZUNvbnRleHQuUHJvdmlkZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VUaGVtZSA9ICgpOiBUaGVtZUNvbnRleHRUeXBlID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChUaGVtZUNvbnRleHQpO1xyXG5cclxuICBpZiAoY29udGV4dCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZVRoZW1lIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBUaGVtZVByb3ZpZGVyJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY29udGV4dDtcclxufTtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlQ29udGV4dCIsIlRoZW1lQ29udGV4dCIsInVuZGVmaW5lZCIsIlRoZW1lUHJvdmlkZXIiLCJjaGlsZHJlbiIsImlzRGFya01vZGUiLCJzZXRJc0RhcmtNb2RlIiwidG9nZ2xlRGFya01vZGUiLCJwcmV2Iiwic3RvcmVkRGFya01vZGUiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYm9keSIsImRvY3VtZW50IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VUaGVtZSIsImNvbnRleHQiLCJFcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/components/theme.tsx\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();