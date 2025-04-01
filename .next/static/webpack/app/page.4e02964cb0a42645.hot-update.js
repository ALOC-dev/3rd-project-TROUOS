"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ KakaoMapPage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/script */ \"(app-pages-browser)/./node_modules/next/dist/api/script.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\nfunction KakaoMapPage() {\n    let map;\n    // 지도 초기화\n    const initMap = ()=>{\n        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스\n        const options = {\n            center: new window.kakao.maps.LatLng(37.583840, 127.059019),\n            level: 4\n        };\n        map = new window.kakao.maps.Map(container, options);\n        //원 그리기\n        const circle = new window.kakao.maps.Circle({\n            center: new window.kakao.maps.LatLng(37.583840, 127.059019),\n            radius: 500,\n            strokeWeight: 1,\n            strokeColor: \"#9BCBE8\",\n            strokeOpacity: 1,\n            strokeStyle: \"solid\",\n            fillColor: \"#B9D9EB\",\n            fillOpacity: 0.4\n        });\n        //원 표시하기\n        circle.setMap(map);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_script__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                src: \"//dapi.kakao.com/v2/maps/sdk.js?appkey=\".concat(\"306db9c0684ed9cd42122e981b8c0ffc\", \"&autoload=false\"),\n                strategy: \"afterInteractive\",\n                onLoad: ()=>{\n                    {}\n                    window.kakao.maps.load(initMap);\n                }\n            }, void 0, false, {\n                fileName: \"D:\\\\3-1\\\\ALOC\\\\ALOC\\\\src\\\\app\\\\page.tsx\",\n                lineNumber: 37,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"map-container\",\n                id: \"map\",\n                style: {\n                    width: '70%',\n                    height: '500px'\n                }\n            }, void 0, false, {\n                fileName: \"D:\\\\3-1\\\\ALOC\\\\ALOC\\\\src\\\\app\\\\page.tsx\",\n                lineNumber: 46,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\3-1\\\\ALOC\\\\ALOC\\\\src\\\\app\\\\page.tsx\",\n        lineNumber: 35,\n        columnNumber: 5\n    }, this);\n}\n_c = KakaoMapPage;\nvar _c;\n$RefreshReg$(_c, \"KakaoMapPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVpQztBQUVsQixTQUFTQztJQUN0QixJQUFJQztJQUVKLFNBQVM7SUFDVCxNQUFNQyxVQUFVO1FBQ2QsTUFBTUMsWUFBWUMsU0FBU0MsY0FBYyxDQUFDLFFBQVEscUJBQXFCO1FBQ3ZFLE1BQU1DLFVBQVU7WUFDZEMsUUFBUSxJQUFJQyxPQUFPQyxLQUFLLENBQUNDLElBQUksQ0FBQ0MsTUFBTSxDQUFDLFdBQVc7WUFDaERDLE9BQU87UUFDVDtRQUNBWCxNQUFNLElBQUlPLE9BQU9DLEtBQUssQ0FBQ0MsSUFBSSxDQUFDRyxHQUFHLENBQUNWLFdBQVdHO1FBRTNDLE9BQU87UUFDUCxNQUFNUSxTQUFTLElBQUlOLE9BQU9DLEtBQUssQ0FBQ0MsSUFBSSxDQUFDSyxNQUFNLENBQUM7WUFDMUNSLFFBQVEsSUFBSUMsT0FBT0MsS0FBSyxDQUFDQyxJQUFJLENBQUNDLE1BQU0sQ0FBQyxXQUFXO1lBQ2hESyxRQUFRO1lBQ1JDLGNBQWM7WUFDZEMsYUFBYTtZQUNiQyxlQUFlO1lBQ2ZDLGFBQWE7WUFDYkMsV0FBVztZQUNYQyxhQUFhO1FBQ2Y7UUFFQSxRQUFRO1FBQ1JSLE9BQU9TLE1BQU0sQ0FBQ3RCO0lBRWhCO0lBRUEscUJBQ0UsOERBQUN1Qjs7MEJBRUMsOERBQUN6QixtREFBTUE7Z0JBQ0wwQixLQUFLLDBDQUFtRixPQUF6Q0Msa0NBQXdDLEVBQUM7Z0JBQ3hGRyxVQUFTO2dCQUNUQyxRQUFRO29CQUNOLENBQStCO29CQUMvQnRCLE9BQU9DLEtBQUssQ0FBQ0MsSUFBSSxDQUFDcUIsSUFBSSxDQUFDN0I7Z0JBQ3pCOzs7Ozs7MEJBR0YsOERBQUNzQjtnQkFBSVEsV0FBWTtnQkFBZ0JDLElBQUc7Z0JBQU1DLE9BQU87b0JBQUVDLE9BQU87b0JBQU9DLFFBQVE7Z0JBQVE7Ozs7Ozs7Ozs7OztBQUd2RjtLQTVDd0JwQyIsInNvdXJjZXMiOlsiRDpcXDMtMVxcQUxPQ1xcQUxPQ1xcc3JjXFxhcHBcXHBhZ2UudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JzsgLy/tgbTrnbzsnbTslrjtirgg7IKs7J2065Oc7JeQ7IScIERPTSDsobDsnpHtlbTslbztlahcclxuXHJcbmltcG9ydCBTY3JpcHQgZnJvbSAnbmV4dC9zY3JpcHQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gS2FrYW9NYXBQYWdlKCkge1xyXG4gIGxldCBtYXA6IGtha2FvLm1hcHMuTWFwO1xyXG5cclxuICAvLyDsp4Drj4Qg7LSI6riw7ZmUXHJcbiAgY29uc3QgaW5pdE1hcCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTsgLy/sp4Drj4Trpbwg64u07J2EIOyYgeyXreydmCBET00g66CI7Y2865+w7IqkXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBjZW50ZXI6IG5ldyB3aW5kb3cua2FrYW8ubWFwcy5MYXRMbmcoMzcuNTgzODQwLCAxMjcuMDU5MDE5KSwgLy8g7LSI6riwIOyijO2RnC4g7Iuc66a964yA66GcIOyEpOyglS4g7KKM7ZGc64qUIGh0dHBzOi8vYXBpcy5tYXAua2FrYW8uY29tL3dlYi9zYW1wbGUvYWRkTWFwQ2xpY2tFdmVudFdpdGhNYXJrZXIvIOyXrOq4sOyEnCDslrvsl4jsirXri4jri6QuXHJcbiAgICAgIGxldmVsOiA0LCAvLyDtmZXrjIAg66CI67KoICjsiKvsnpDqsIAg7J6R7J2E7IiY66GdIO2ZleuMgOuQqClcclxuICAgIH07XHJcbiAgICBtYXAgPSBuZXcgd2luZG93Lmtha2FvLm1hcHMuTWFwKGNvbnRhaW5lciwgb3B0aW9ucyk7XHJcblxyXG4gICAgLy/sm5Ag6re466as6riwXHJcbiAgICBjb25zdCBjaXJjbGUgPSBuZXcgd2luZG93Lmtha2FvLm1hcHMuQ2lyY2xlKHtcclxuICAgICAgY2VudGVyOiBuZXcgd2luZG93Lmtha2FvLm1hcHMuTGF0TG5nKDM3LjU4Mzg0MCwgMTI3LjA1OTAxOSksXHJcbiAgICAgIHJhZGl1czogNTAwLFxyXG4gICAgICBzdHJva2VXZWlnaHQ6IDEsIC8vIOyEoCDrkZDqu5hcclxuICAgICAgc3Ryb2tlQ29sb3I6IFwiIzlCQ0JFOFwiLCAvLyDshKDsnZgg7IOJ7IOBXHJcbiAgICAgIHN0cm9rZU9wYWNpdHk6IDEsIC8vIOyEoOydmCDrtojtiKzrqoXrj4QgKDB+MSlcclxuICAgICAgc3Ryb2tlU3R5bGU6IFwic29saWRcIiwgLy8g7ISgIOyKpO2DgOydvFxyXG4gICAgICBmaWxsQ29sb3I6IFwiI0I5RDlFQlwiLCAvLyDssYTsmrDquLAg7IOJ7IOBXHJcbiAgICAgIGZpbGxPcGFjaXR5OiAwLjQsIC8vIOyxhOyasOq4sCDrtojtiKzrqoXrj4QgKDB+MSlcclxuICAgIH0pO1xyXG5cclxuICAgIC8v7JuQIO2RnOyLnO2VmOq4sFxyXG4gICAgY2lyY2xlLnNldE1hcChtYXApO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgey8q7Iqk7YGs66a97Yq4IOuhnOuTnCovfVxyXG4gICAgICA8U2NyaXB0XHJcbiAgICAgICAgc3JjPXtgLy9kYXBpLmtha2FvLmNvbS92Mi9tYXBzL3Nkay5qcz9hcHBrZXk9JHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19LQUtBT01BUF9BUElfS0VZfSZhdXRvbG9hZD1mYWxzZWB9IC8vYXBp7YKk64qUIOuztOyViOydhCDsnITtlbQg7ZmY6rK9IOuzgOyImOuhnCDqtIDrpqxcclxuICAgICAgICBzdHJhdGVneT1cImFmdGVySW50ZXJhY3RpdmVcIlxyXG4gICAgICAgIG9uTG9hZD17KCkgPT4ge1xyXG4gICAgICAgICAgey8qb25sb2FkIOydtOuypO2KuOyXkOyEnCBBUEkg7LSI6riw7ZmUIO2VqOyImCDsi6TtlokqL31cclxuICAgICAgICAgIHdpbmRvdy5rYWthby5tYXBzLmxvYWQoaW5pdE1hcCk7XHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuICAgICAgey8q7KeA64+EIO2RnOyLnCDsmIHsl60qL31cclxuICAgICAgPGRpdiBjbGFzc05hbWUgPSBcIm1hcC1jb250YWluZXJcIiBpZD1cIm1hcFwiIHN0eWxlPXt7IHdpZHRoOiAnNzAlJywgaGVpZ2h0OiAnNTAwcHgnIH19PjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuXHJcbiJdLCJuYW1lcyI6WyJTY3JpcHQiLCJLYWthb01hcFBhZ2UiLCJtYXAiLCJpbml0TWFwIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9wdGlvbnMiLCJjZW50ZXIiLCJ3aW5kb3ciLCJrYWthbyIsIm1hcHMiLCJMYXRMbmciLCJsZXZlbCIsIk1hcCIsImNpcmNsZSIsIkNpcmNsZSIsInJhZGl1cyIsInN0cm9rZVdlaWdodCIsInN0cm9rZUNvbG9yIiwic3Ryb2tlT3BhY2l0eSIsInN0cm9rZVN0eWxlIiwiZmlsbENvbG9yIiwiZmlsbE9wYWNpdHkiLCJzZXRNYXAiLCJkaXYiLCJzcmMiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfS0FLQU9NQVBfQVBJX0tFWSIsInN0cmF0ZWd5Iiwib25Mb2FkIiwibG9hZCIsImNsYXNzTmFtZSIsImlkIiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});