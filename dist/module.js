/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/module/helper/TemplatePreloader.ts":
/*!************************************************!*\
  !*** ./src/module/helper/TemplatePreloader.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TemplatePreloader": () => (/* binding */ TemplatePreloader)
/* harmony export */ });
;
class TemplatePreloader {
    /**
     * Preload a set of templates to compile and cache them for fast access during rendering
     */
    static async preloadHandlebarsTemplates() {
        const templatePaths = [];
        return loadTemplates(templatePaths);
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/carin-automation.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_helper_TemplatePreloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/helper/TemplatePreloader */ "./src/module/helper/TemplatePreloader.ts");

CONFIG.debug.hooks = true;
Hooks.once("init", async () => {
    console.log("=============================HMR============================");
});
function _buildDamageRollMessage(label, targetIds) {
    const rollMessageTpl = 'systems/cairn/templates/chat/dmg-roll-card.html';
    const tplData = { label: label, targets: targetIds };
    console.log(tplData);
    return renderTemplate(rollMessageTpl, tplData);
}
Hooks.once("ready", () => {
    game["cairn"].rollItemMacro = async (actorId, itemId) => {
        const actor = game.actors.get(actorId);
        const item = actor.items.get(itemId);
        const label = game.i18n.localize("CAIRN.RollingDmgWith") + ` ${item.name}`;
        const targetedTokens = Array.from(game.user.targets).map(t => t.id);
        let targetIds;
        if (targetedTokens.length == 0)
            targetIds = null;
        else if (targetedTokens.length == 1)
            targetIds = targetedTokens[0];
        else {
            targetIds = targetedTokens[0];
            for (let index = 1; index < targetedTokens.length; index++) {
                const element = targetedTokens[index];
                targetIds = targetIds.concat(";", element);
            }
        }
        const roll = new Roll(item.system.damageFormula, actor.getRollData());
        roll.evaluate();
        _buildDamageRollMessage(label, targetIds).then((msg) => {
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                flavor: msg
            });
        });
    };
});
Hooks.on("hotbarDrop", (_, dropData, slot) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const itemFromUuid = fromUuidSync(dropData.uuid);
    const actor = itemFromUuid
        ? itemFromUuid.actor
        : dropData.sceneId
            ? (_c = (_b = (_a = game.scenes) === null || _a === void 0 ? void 0 : _a.get(dropData.sceneId)) === null || _b === void 0 ? void 0 : _b.tokens) === null || _c === void 0 ? void 0 : _c.get(dropData.tokenId).actor
            : (_d = game.actors) === null || _d === void 0 ? void 0 : _d.get(dropData.actorId);
    const item = actor ? (itemFromUuid ? itemFromUuid : actor.items.get(dropData.data._id)) : null;
    if ((dropData === null || dropData === void 0 ? void 0 : dropData.type) !== "Item") {
        return;
    }
    if (!actor) {
        return (_e = ui.notifications) === null || _e === void 0 ? void 0 : _e.warn("You can only create macro buttons for owned Items");
    }
    if (item.type !== "weapon") {
        return;
    }
    const command = `game.cairn.rollItemMacro("${actor.id}", "${item.id}");`;
    let macro = (_f = game.macros) === null || _f === void 0 ? void 0 : _f.find((m) => m.name === item.name && m.command === command);
    if (!macro) {
        Macro.create({
            name: item.name,
            type: "script",
            img: item.img,
            command,
            flags: { "cairn.itemMacro": true },
        }).then(new_macro => { var _a; return (_a = game.user) === null || _a === void 0 ? void 0 : _a.assignHotbarMacro(new_macro, slot); });
    }
    if (macro)
        (_g = game.user) === null || _g === void 0 ? void 0 : _g.assignHotbarMacro(macro, slot);
    return false;
});
if (true) {
    if (false) {}
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGFjZWhvbGRlci8uL3NyYy9tb2R1bGUvaGVscGVyL1RlbXBsYXRlUHJlbG9hZGVyLnRzIiwid2VicGFjazovL3BsYWNlaG9sZGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsYWNlaG9sZGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGFjZWhvbGRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsYWNlaG9sZGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGxhY2Vob2xkZXIvLi9zcmMvY2FyaW4tYXV0b21hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLENBQUM7QUFFTSxNQUFNLGlCQUFpQjtJQUMxQjs7T0FFRztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCO1FBQ25DLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QixPQUFPLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0o7Ozs7Ozs7VUNWRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05zRTtBQUl0RSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFFMUIsS0FBSyxDQUFDLElBQUks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O1lBQ2YsSUFBSSxFQUFFLFFBQVE7WUFDZCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixPQUFPO1lBQ1AsS0FBSyxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFO1NBQ25DLENBQUMsQ0FBQyxJQUFJLENBQ0gsU0FBUyxDQUFDLEVBQUUsV0FBQyxpQkFBSSxDQUFDLElBQUksMENBQUUsaUJBQWlCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUM3RDtLQUNGO0lBQ0QsSUFBRyxLQUFLO1FBQ1IsVUFBSSxDQUFDLElBQUksMENBQUUsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztJQUN6QyxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDLENBQ047QUFJRCxJQUFJLElBQXNDLEVBQUU7SUFDeEMsSUFBSSxLQUFVLEVBQUUsRUFrQmY7Q0FDSiIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVByZWxvYWRlciB7XG4gICAgLyoqXG4gICAgICogUHJlbG9hZCBhIHNldCBvZiB0ZW1wbGF0ZXMgdG8gY29tcGlsZSBhbmQgY2FjaGUgdGhlbSBmb3IgZmFzdCBhY2Nlc3MgZHVyaW5nIHJlbmRlcmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyBwcmVsb2FkSGFuZGxlYmFyc1RlbXBsYXRlcygpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGVQYXRocyA9IFtdO1xuICAgICAgICByZXR1cm4gbG9hZFRlbXBsYXRlcyh0ZW1wbGF0ZVBhdGhzKTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRlbXBsYXRlUHJlbG9hZGVyIH0gZnJvbSBcIi4vbW9kdWxlL2hlbHBlci9UZW1wbGF0ZVByZWxvYWRlclwiO1xuXG5kZWNsYXJlIGZ1bmN0aW9uIGZyb21VdWlkU3luYyh1dWlkOiBzdHJpbmcpOiAgb2JqZWN0IHwgRW50aXR5PEVudGl0eS5EYXRhLCBFbnRpdHkuRGF0YT4gfCBudWxsXG5cbkNPTkZJRy5kZWJ1Zy5ob29rcyA9IHRydWU7XG5cbkhvb2tzLm9uY2UoXCJpbml0XCIsIGFzeW5jICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09SE1SPT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxufSk7XG5cblxuXG5mdW5jdGlvbiBfYnVpbGREYW1hZ2VSb2xsTWVzc2FnZShsYWJlbCwgdGFyZ2V0SWRzKSB7XG4gICAgY29uc3Qgcm9sbE1lc3NhZ2VUcGwgPSAnc3lzdGVtcy9jYWlybi90ZW1wbGF0ZXMvY2hhdC9kbWctcm9sbC1jYXJkLmh0bWwnOyAgIFxuICAgIGNvbnN0IHRwbERhdGEgPSB7bGFiZWw6IGxhYmVsLCB0YXJnZXRzOiB0YXJnZXRJZHN9O1xuICAgIGNvbnNvbGUubG9nKHRwbERhdGEpXG4gICAgcmV0dXJuIHJlbmRlclRlbXBsYXRlKHJvbGxNZXNzYWdlVHBsLCB0cGxEYXRhKTtcbn1cblxuSG9va3Mub25jZShcInJlYWR5XCIsICAoKSA9PiB7XG4gICAgKGdhbWVbXCJjYWlyblwiXWFzIGFueSkucm9sbEl0ZW1NYWNybyA9IGFzeW5jIChhY3RvcklkLCBpdGVtSWQpID0+IHtcbiAgICBjb25zdCBhY3RvciA9IGdhbWUuYWN0b3JzIS5nZXQoYWN0b3JJZCk7XG4gICAgY29uc3QgaXRlbSA9IGFjdG9yIS5pdGVtcyEuZ2V0KGl0ZW1JZCk7XG5cblxuICAgIGNvbnN0IGxhYmVsID0gZ2FtZS5pMThuLmxvY2FsaXplKFwiQ0FJUk4uUm9sbGluZ0RtZ1dpdGhcIikgKyBgICR7aXRlbSEubmFtZX1gIFxuXG4gICAgY29uc3QgdGFyZ2V0ZWRUb2tlbnMgPSBBcnJheS5mcm9tKGdhbWUudXNlciEudGFyZ2V0cykubWFwKHQgPT4gdC5pZCk7XG5cbiAgICBsZXQgdGFyZ2V0SWRzO1xuICAgIGlmICh0YXJnZXRlZFRva2Vucy5sZW5ndGggPT0gMCkgdGFyZ2V0SWRzID0gbnVsbDtcbiAgICBlbHNlIGlmICh0YXJnZXRlZFRva2Vucy5sZW5ndGggPT0gMSkgdGFyZ2V0SWRzID0gdGFyZ2V0ZWRUb2tlbnNbMF07XG4gICAgZWxzZSB7XG4gICAgICB0YXJnZXRJZHMgPSB0YXJnZXRlZFRva2Vuc1swXTtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCB0YXJnZXRlZFRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRhcmdldGVkVG9rZW5zW2luZGV4XTtcbiAgICAgICAgdGFyZ2V0SWRzID0gdGFyZ2V0SWRzLmNvbmNhdChcIjtcIixlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgcm9sbCA9IG5ldyBSb2xsKChpdGVtIGFzIGFueSkhLnN5c3RlbS5kYW1hZ2VGb3JtdWxhLCAgYWN0b3IhLmdldFJvbGxEYXRhKCkpO1xuICAgIHJvbGwuZXZhbHVhdGUoKTtcbiAgICBcbiAgICBfYnVpbGREYW1hZ2VSb2xsTWVzc2FnZShsYWJlbCwgdGFyZ2V0SWRzKS50aGVuKChtc2cpID0+IHtcbiAgICAgICAgcm9sbC50b01lc3NhZ2Uoe1xuICAgICAgICAgIHNwZWFrZXI6IENoYXRNZXNzYWdlLmdldFNwZWFrZXIoeyBhY3RvcjogYWN0b3IgfSksXG4gICAgICAgICAgZmxhdm9yOiBtc2dcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIH1cbn0pO1xuXG5cbkhvb2tzLm9uKFxuICAgIFwiaG90YmFyRHJvcFwiLCAoXywgZHJvcERhdGEgOiB7IHV1aWQsIHR5cGUsIHNjZW5lSWQsIGFjdG9ySWQsIHRva2VuSWQgfSwgc2xvdCkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtRnJvbVV1aWQgPSBmcm9tVXVpZFN5bmMoZHJvcERhdGEudXVpZCkgXG4gICAgICAgIGNvbnN0IGFjdG9yID0gaXRlbUZyb21VdWlkXG4gICAgICAgICAgPyAoaXRlbUZyb21VdWlkIGFzIGFueSkuYWN0b3JcbiAgICAgICAgICA6IGRyb3BEYXRhLnNjZW5lSWRcbiAgICAgICAgICAgID8gKGdhbWUuc2NlbmVzIGFzIGFueSk/LmdldChkcm9wRGF0YS5zY2VuZUlkKT8udG9rZW5zPy5nZXQoZHJvcERhdGEudG9rZW5JZCkuYWN0b3JcbiAgICAgICAgICAgIDogZ2FtZS5hY3RvcnM/LmdldChkcm9wRGF0YS5hY3RvcklkKTtcbiAgICAgIFxuICAgICAgICBjb25zdCBpdGVtID0gYWN0b3IgPyAoaXRlbUZyb21VdWlkID8gaXRlbUZyb21VdWlkIDogYWN0b3IuaXRlbXMuZ2V0KChkcm9wRGF0YSBhcyBhbnkpLmRhdGEuX2lkKSkgOiBudWxsO1xuICAgICAgXG4gICAgICAgIGlmIChkcm9wRGF0YT8udHlwZSAhPT0gXCJJdGVtXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgIGlmICghYWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiB1aS5ub3RpZmljYXRpb25zPy53YXJuKFwiWW91IGNhbiBvbmx5IGNyZWF0ZSBtYWNybyBidXR0b25zIGZvciBvd25lZCBJdGVtc1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgIGlmIChpdGVtLnR5cGUgIT09IFwid2VhcG9uXCIpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgY29uc3QgY29tbWFuZCA9IGBnYW1lLmNhaXJuLnJvbGxJdGVtTWFjcm8oXCIke2FjdG9yLmlkfVwiLCBcIiR7aXRlbS5pZH1cIik7YDtcbiAgICAgICAgICBsZXQgbWFjcm8gPSBnYW1lLm1hY3Jvcz8uZmluZCgobSkgPT4gbS5uYW1lID09PSBpdGVtLm5hbWUgJiYgKG0gYXMgYW55KS5jb21tYW5kID09PSBjb21tYW5kKTtcbiAgICAgICAgICBpZiAoIW1hY3JvKSB7XG4gICAgICAgICAgICBNYWNyby5jcmVhdGUoe1xuICAgICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgIHR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICAgIGltZzogaXRlbS5pbWcsXG4gICAgICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgICAgIGZsYWdzOiB7IFwiY2Fpcm4uaXRlbU1hY3JvXCI6IHRydWUgfSxcbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgbmV3X21hY3JvID0+IGdhbWUudXNlcj8uYXNzaWduSG90YmFyTWFjcm8obmV3X21hY3JvLCBzbG90KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihtYWNybylcbiAgICAgICAgICBnYW1lLnVzZXI/LmFzc2lnbkhvdGJhck1hY3JvKG1hY3JvLCBzbG90KVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbilcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcblxuICAgICAgICBpZiAobW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gXCJhcHBseVwiKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRlbXBsYXRlIGluIF90ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfdGVtcGxhdGVDYWNoZSwgdGVtcGxhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfdGVtcGxhdGVDYWNoZVt0ZW1wbGF0ZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBUZW1wbGF0ZVByZWxvYWRlci5wcmVsb2FkSGFuZGxlYmFyc1RlbXBsYXRlcygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXBwbGljYXRpb24gaW4gdWkud2luZG93cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHVpLndpbmRvd3MsIGFwcGxpY2F0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdWkud2luZG93c1thcHBsaWNhdGlvbl0ucmVuZGVyKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==