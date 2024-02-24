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
let overriden_damage_module;
let module_import_promise;
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
    PatchMacro();
    PatchDamage();
    PatchHotbar();
});
if (true) {
    if (false) {}
}
function PatchHotbar() {
    Hooks.off("hotbarDrop", 8);
    Hooks.on("hotbarDrop", (_, dropData, slot) => {
        var _a, _b, _c, _d, _e;
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
        createMacro(actor, item, slot);
        createMacroAdv(actor, item);
        createMacroDis(actor, item);
        return false;
    });
}
function createMacroAdv(actor, item) {
    var _a, _b;
    const command = `game.cairn.rollItemMacroAdvantage("${actor.id}");`;
    let macro = (_a = game.macros) === null || _a === void 0 ? void 0 : _a.find((m) => m.name === item.name + game.i18n.localize("CAIRN.Advantage") && m.command === command);
    if (!macro) {
        Macro.create({
            name: item.name + " " + game.i18n.localize("CAIRN.Advantage"),
            type: "script",
            img: item.img,
            command,
            flags: { "cairn.itemMacro": true },
        }).then(new_macro => { var _a; return (_a = game.user) === null || _a === void 0 ? void 0 : _a.assignHotbarMacro(new_macro, 9); });
    }
    if (macro)
        (_b = game.user) === null || _b === void 0 ? void 0 : _b.assignHotbarMacro(macro, 9);
}
function createMacroDis(actor, item) {
    var _a, _b;
    const command = `game.cairn.rollItemMacroDisadvantage("${actor.id}");`;
    let macro = (_a = game.macros) === null || _a === void 0 ? void 0 : _a.find((m) => m.name === item.name + " " + game.i18n.localize("CAIRN.Disadvantage") && m.command === command);
    if (!macro) {
        Macro.create({
            name: item.name + " " + game.i18n.localize("CAIRN.Disadvantage"),
            type: "script",
            img: item.img,
            command,
            flags: { "cairn.itemMacro": true },
        }).then(new_macro => { var _a; return (_a = game.user) === null || _a === void 0 ? void 0 : _a.assignHotbarMacro(new_macro, 10); });
    }
    if (macro)
        (_b = game.user) === null || _b === void 0 ? void 0 : _b.assignHotbarMacro(macro, 10);
}
function createMacro(actor, item, slot) {
    var _a, _b;
    const command = `game.cairn.rollItemMacro("${actor.id}", "${item.id}");`;
    let macro = (_a = game.macros) === null || _a === void 0 ? void 0 : _a.find((m) => m.name === item.name && m.command === command);
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
        (_b = game.user) === null || _b === void 0 ? void 0 : _b.assignHotbarMacro(macro, slot);
}
function PatchDamage() {
    eval(`module_import_promise = import('/systems/cairn/module/damage.js')`);
    module_import_promise.then((m) => {
        overriden_damage_module = m;
        overriden_damage_module.Damage.applyToTarget = function (target, damage) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            // @ts-ignore
            const tokenDoc = canvas.scene.tokens.get(target);
            // Linked to Actor
            if (tokenDoc.isLinked) {
                const armor = tokenDoc.actor.system.armor;
                const hp = tokenDoc.actor.system.hp.value;
                const str = tokenDoc.actor.system.abilities.STR.value;
                let { dmg, newHp, newStr } = overriden_damage_module.Damage._calculateHpAndStr(damage, armor, hp, str);
                tokenDoc.actor.system.hp.value = newHp;
                tokenDoc.actor.system.abilities.STR.value = newStr;
                const actor = tokenDoc.actor;
                return { actor, dmg, damage, armor, hp, str, newHp, newStr };
            }
            // Synthetic actor
            else {
                let armor = (_b = (_a = tokenDoc.actorData) === null || _a === void 0 ? void 0 : _a.system) === null || _b === void 0 ? void 0 : _b.armor;
                if (armor === undefined)
                    armor = tokenDoc.actor.system.armor;
                let hp = (_e = (_d = (_c = tokenDoc.actorData) === null || _c === void 0 ? void 0 : _c.system) === null || _d === void 0 ? void 0 : _d.hp) === null || _e === void 0 ? void 0 : _e.value;
                if (hp === undefined)
                    hp = tokenDoc.actor.system.hp.value;
                let str = (_j = (_h = (_g = (_f = tokenDoc.actorData) === null || _f === void 0 ? void 0 : _f.system) === null || _g === void 0 ? void 0 : _g.abilities) === null || _h === void 0 ? void 0 : _h.STR) === null || _j === void 0 ? void 0 : _j.value;
                if (str === undefined)
                    str = tokenDoc.actor.system.abilities.STR.value;
                let { dmg, newHp, newStr } = overriden_damage_module.Damage._calculateHpAndStr(damage, armor, hp, str);
                tokenDoc.actor.system.hp.value = newHp;
                tokenDoc.actor.system.abilities.STR.value = newStr;
                const actor = tokenDoc.actor;
                return { actor, dmg, damage, armor, hp, str, newHp, newStr };
            }
        };
        Hooks.off("renderChatMessage", 4);
        Hooks.on("renderChatMessage", (message, html, data) => {
            var _a, _b;
            // Roll Str Save
            // @ts-ignore
            const actor = (_a = game.actors) === null || _a === void 0 ? void 0 : _a.get((_b = message.speaker) === null || _b === void 0 ? void 0 : _b.actor);
            if (actor !== undefined) {
                // @ts-ignore
                if (actor.testUserPermission(game.user, "OWNER") || game.user.isGM) {
                    html.find(".roll-str-save").click(ev => overriden_damage_module.Damage._rollStrSave(actor, html));
                }
                else {
                    html.find(".roll-str-save").each((i, btn) => { btn.style.display = "none"; });
                }
            }
            else {
                html.find(".roll-str-save").each((i, btn) => { btn.style.display = "none"; });
            }
            // @ts-ignore
            if (game.user.isGM) {
                html.find(".apply-dmg").click(ev => overriden_damage_module.Damage.onClickChatMessageApplyButton(ev, html, data));
            }
            else {
                html.find(".apply-dmg").each((i, btn) => { btn.style.display = "none"; });
            }
        });
    });
}
function PatchMacro() {
    game["cairn"].rollItemMacro = async (actorId, itemId) => {
        var _a;
        const actor = game.actors.get(actorId);
        const item = actor.items.get(itemId);
        // @ts-ignore
        if (((_a = item === null || item === void 0 ? void 0 : item.system) === null || _a === void 0 ? void 0 : _a.equpped) == false) {
            // @ts-ignore
            return ui.notifications.warn("This weapon is not equipped");
        }
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
    game["cairn"].rollItemMacroAdvantage = async (actorId) => {
        const actor = game.actors.get(actorId);
        const label = game.i18n.localize("CAIRN.RollingDmgWith") + ` Advantage`;
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
        const roll = new Roll("1d12", actor.getRollData());
        roll.evaluate();
        _buildDamageRollMessage(label, targetIds).then((msg) => {
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                flavor: msg
            });
        });
    };
    game["cairn"].rollItemMacroDisadvantage = async (actorId) => {
        const actor = game.actors.get(actorId);
        const label = game.i18n.localize("CAIRN.RollingDmgWith") + ` Disadvantage`;
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
        const roll = new Roll("1d4", actor.getRollData());
        roll.evaluate();
        _buildDamageRollMessage(label, targetIds).then((msg) => {
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                flavor: msg
            });
        });
    };
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGFjZWhvbGRlci8uL3NyYy9tb2R1bGUvaGVscGVyL1RlbXBsYXRlUHJlbG9hZGVyLnRzIiwid2VicGFjazovL3BsYWNlaG9sZGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsYWNlaG9sZGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGFjZWhvbGRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsYWNlaG9sZGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGxhY2Vob2xkZXIvLi9zcmMvY2FyaW4tYXV0b21hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLENBQUM7QUFFTSxNQUFNLGlCQUFpQjtJQUMxQjs7T0FFRztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCO1FBQ25DLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QixPQUFPLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0o7Ozs7Ozs7VUNWRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05zRTtBQUt0RSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDMUIsSUFBSSx1QkFBdUIsQ0FB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LFNBQVMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hELE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQzlDO1NBQ0o7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhCLHVCQUF1QixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNYLE9BQU8sRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUNqRCxNQUFNLEVBQUUsR0FBRzthQUNkLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQyxDQUFDO0FBRU4sQ0FBQyIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVByZWxvYWRlciB7XG4gICAgLyoqXG4gICAgICogUHJlbG9hZCBhIHNldCBvZiB0ZW1wbGF0ZXMgdG8gY29tcGlsZSBhbmQgY2FjaGUgdGhlbSBmb3IgZmFzdCBhY2Nlc3MgZHVyaW5nIHJlbmRlcmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyBwcmVsb2FkSGFuZGxlYmFyc1RlbXBsYXRlcygpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGVQYXRocyA9IFtdO1xuICAgICAgICByZXR1cm4gbG9hZFRlbXBsYXRlcyh0ZW1wbGF0ZVBhdGhzKTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRlbXBsYXRlUHJlbG9hZGVyIH0gZnJvbSBcIi4vbW9kdWxlL2hlbHBlci9UZW1wbGF0ZVByZWxvYWRlclwiO1xuXG5kZWNsYXJlIGZ1bmN0aW9uIGZyb21VdWlkU3luYyh1dWlkOiBzdHJpbmcpOiAgb2JqZWN0IHwgRW50aXR5PEVudGl0eS5EYXRhLCBFbnRpdHkuRGF0YT4gfCBudWxsXG5cblxuQ09ORklHLmRlYnVnLmhvb2tzID0gdHJ1ZTtcbmxldCBvdmVycmlkZW5fZGFtYWdlX21vZHVsZTtcbmxldCBtb2R1bGVfaW1wb3J0X3Byb21pc2U6IFByb21pc2U8YW55PiBcbkhvb2tzLm9uY2UoXCJpbml0XCIsIGFzeW5jICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09SE1SPT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxufSk7XG5cblxuXG5mdW5jdGlvbiBfYnVpbGREYW1hZ2VSb2xsTWVzc2FnZShsYWJlbCwgdGFyZ2V0SWRzKSB7XG4gICAgY29uc3Qgcm9sbE1lc3NhZ2VUcGwgPSAnc3lzdGVtcy9jYWlybi90ZW1wbGF0ZXMvY2hhdC9kbWctcm9sbC1jYXJkLmh0bWwnOyAgIFxuICAgIGNvbnN0IHRwbERhdGEgPSB7bGFiZWw6IGxhYmVsLCB0YXJnZXRzOiB0YXJnZXRJZHN9O1xuICAgIGNvbnNvbGUubG9nKHRwbERhdGEpXG4gICAgcmV0dXJuIHJlbmRlclRlbXBsYXRlKHJvbGxNZXNzYWdlVHBsLCB0cGxEYXRhKTtcbn1cblxuXG5cbkhvb2tzLm9uY2UoXCJyZWFkeVwiLCAgKCkgPT4ge1xuICAgIFBhdGNoTWFjcm8oKTtcbiAgICBQYXRjaERhbWFnZSgpO1xuICAgIFBhdGNoSG90YmFyKCk7XG5cbn0pO1xuXG5cblxuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuXG4gICAgICAgIGlmIChtb2R1bGUuaG90LnN0YXR1cygpID09PSBcImFwcGx5XCIpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGVtcGxhdGUgaW4gX3RlbXBsYXRlQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF90ZW1wbGF0ZUNhY2hlLCB0ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF90ZW1wbGF0ZUNhY2hlW3RlbXBsYXRlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFRlbXBsYXRlUHJlbG9hZGVyLnByZWxvYWRIYW5kbGViYXJzVGVtcGxhdGVzKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhcHBsaWNhdGlvbiBpbiB1aS53aW5kb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodWkud2luZG93cywgYXBwbGljYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1aS53aW5kb3dzW2FwcGxpY2F0aW9uXS5yZW5kZXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gUGF0Y2hIb3RiYXIoKSB7XG4gICAgSG9va3Mub2ZmKFwiaG90YmFyRHJvcFwiLDgpXG4gICAgSG9va3Mub24oXG4gICAgICAgIFwiaG90YmFyRHJvcFwiLCAoXywgZHJvcERhdGE6IHsgdXVpZDsgdHlwZTsgc2NlbmVJZDsgYWN0b3JJZDsgdG9rZW5JZDsgfSwgc2xvdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUZyb21VdWlkID0gZnJvbVV1aWRTeW5jKGRyb3BEYXRhLnV1aWQpO1xuICAgICAgICAgICAgY29uc3QgYWN0b3IgPSBpdGVtRnJvbVV1aWRcbiAgICAgICAgICAgICAgICA/IChpdGVtRnJvbVV1aWQgYXMgYW55KS5hY3RvclxuICAgICAgICAgICAgICAgIDogZHJvcERhdGEuc2NlbmVJZFxuICAgICAgICAgICAgICAgICAgICA/IChnYW1lLnNjZW5lcyBhcyBhbnkpPy5nZXQoZHJvcERhdGEuc2NlbmVJZCk/LnRva2Vucz8uZ2V0KGRyb3BEYXRhLnRva2VuSWQpLmFjdG9yXG4gICAgICAgICAgICAgICAgICAgIDogZ2FtZS5hY3RvcnM/LmdldChkcm9wRGF0YS5hY3RvcklkKTtcblxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGFjdG9yID8gKGl0ZW1Gcm9tVXVpZCA/IGl0ZW1Gcm9tVXVpZCA6IGFjdG9yLml0ZW1zLmdldCgoZHJvcERhdGEgYXMgYW55KS5kYXRhLl9pZCkpIDogbnVsbDtcblxuICAgICAgICAgICAgaWYgKGRyb3BEYXRhPy50eXBlICE9PSBcIkl0ZW1cIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFhY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB1aS5ub3RpZmljYXRpb25zPy53YXJuKFwiWW91IGNhbiBvbmx5IGNyZWF0ZSBtYWNybyBidXR0b25zIGZvciBvd25lZCBJdGVtc1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSAhPT0gXCJ3ZWFwb25cIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3JlYXRlTWFjcm8oYWN0b3IsIGl0ZW0sIHNsb3QpO1xuICAgICAgICAgICAgY3JlYXRlTWFjcm9BZHYoYWN0b3IsIGl0ZW0pO1xuICAgICAgICAgICAgY3JlYXRlTWFjcm9EaXMoYWN0b3IsIGl0ZW0pO1xuXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hY3JvQWR2KGFjdG9yOiBhbnksIGl0ZW06IGFueSkge1xuICAgIGNvbnN0IGNvbW1hbmQgPSBgZ2FtZS5jYWlybi5yb2xsSXRlbU1hY3JvQWR2YW50YWdlKFwiJHthY3Rvci5pZH1cIik7YDtcbiAgICBsZXQgbWFjcm8gPSBnYW1lLm1hY3Jvcz8uZmluZCgobSkgPT4gbS5uYW1lID09PSBpdGVtLm5hbWUgKyBnYW1lLmkxOG4ubG9jYWxpemUoXCJDQUlSTi5BZHZhbnRhZ2VcIikgJiYgKG0gYXMgYW55KS5jb21tYW5kID09PSBjb21tYW5kKTtcbiAgICBpZiAoIW1hY3JvKSB7XG4gICAgICAgIE1hY3JvLmNyZWF0ZSh7XG4gICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUgKyBcIiBcIiArIGdhbWUuaTE4bi5sb2NhbGl6ZShcIkNBSVJOLkFkdmFudGFnZVwiKSxcbiAgICAgICAgICAgIHR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICBpbWc6IGl0ZW0uaW1nLFxuICAgICAgICAgICAgY29tbWFuZCxcbiAgICAgICAgICAgIGZsYWdzOiB7IFwiY2Fpcm4uaXRlbU1hY3JvXCI6IHRydWUgfSxcbiAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgIG5ld19tYWNybyA9PiBnYW1lLnVzZXI/LmFzc2lnbkhvdGJhck1hY3JvKG5ld19tYWNybywgOSlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1hY3JvKVxuICAgICAgICBnYW1lLnVzZXI/LmFzc2lnbkhvdGJhck1hY3JvKG1hY3JvLCA5KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWFjcm9EaXMoYWN0b3I6IGFueSwgaXRlbTogYW55KSB7XG4gICAgY29uc3QgY29tbWFuZCA9IGBnYW1lLmNhaXJuLnJvbGxJdGVtTWFjcm9EaXNhZHZhbnRhZ2UoXCIke2FjdG9yLmlkfVwiKTtgO1xuICAgIGxldCBtYWNybyA9IGdhbWUubWFjcm9zPy5maW5kKChtKSA9PiBtLm5hbWUgPT09IGl0ZW0ubmFtZSArIFwiIFwiICsgZ2FtZS5pMThuLmxvY2FsaXplKFwiQ0FJUk4uRGlzYWR2YW50YWdlXCIpICYmIChtIGFzIGFueSkuY29tbWFuZCA9PT0gY29tbWFuZCk7XG4gICAgaWYgKCFtYWNybykge1xuICAgICAgICBNYWNyby5jcmVhdGUoe1xuICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lICsgXCIgXCIgKyBnYW1lLmkxOG4ubG9jYWxpemUoXCJDQUlSTi5EaXNhZHZhbnRhZ2VcIiksXG4gICAgICAgICAgICB0eXBlOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgaW1nOiBpdGVtLmltZyxcbiAgICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgICBmbGFnczogeyBcImNhaXJuLml0ZW1NYWNyb1wiOiB0cnVlIH0sXG4gICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICBuZXdfbWFjcm8gPT4gZ2FtZS51c2VyPy5hc3NpZ25Ib3RiYXJNYWNybyhuZXdfbWFjcm8sIDEwKVxuICAgICAgICApO1xuICAgIH1cbiAgICBpZiAobWFjcm8pXG4gICAgICAgIGdhbWUudXNlcj8uYXNzaWduSG90YmFyTWFjcm8obWFjcm8sIDEwKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWFjcm8oYWN0b3I6IGFueSwgaXRlbTogYW55LCBzbG90OiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb21tYW5kID0gYGdhbWUuY2Fpcm4ucm9sbEl0ZW1NYWNybyhcIiR7YWN0b3IuaWR9XCIsIFwiJHtpdGVtLmlkfVwiKTtgO1xuICAgIGxldCBtYWNybyA9IGdhbWUubWFjcm9zPy5maW5kKChtKSA9PiBtLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiAobSBhcyBhbnkpLmNvbW1hbmQgPT09IGNvbW1hbmQpO1xuICAgIGlmICghbWFjcm8pIHtcbiAgICAgICAgTWFjcm8uY3JlYXRlKHtcbiAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgIHR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICBpbWc6IGl0ZW0uaW1nLFxuICAgICAgICAgICAgY29tbWFuZCxcbiAgICAgICAgICAgIGZsYWdzOiB7IFwiY2Fpcm4uaXRlbU1hY3JvXCI6IHRydWUgfSxcbiAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgIG5ld19tYWNybyA9PiBnYW1lLnVzZXI/LmFzc2lnbkhvdGJhck1hY3JvKG5ld19tYWNybywgc2xvdClcbiAgICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1hY3JvKVxuICAgICAgICBnYW1lLnVzZXI/LmFzc2lnbkhvdGJhck1hY3JvKG1hY3JvLCBzbG90KTtcbn1cblxuZnVuY3Rpb24gUGF0Y2hEYW1hZ2UoKSB7XG4gICAgZXZhbChgbW9kdWxlX2ltcG9ydF9wcm9taXNlID0gaW1wb3J0KCcvc3lzdGVtcy9jYWlybi9tb2R1bGUvZGFtYWdlLmpzJylgKTtcbiAgICBtb2R1bGVfaW1wb3J0X3Byb21pc2UudGhlbihcbiAgICAgICAgKG0pID0+IHtcbiAgICAgICAgICAgIG92ZXJyaWRlbl9kYW1hZ2VfbW9kdWxlID0gbTtcblxuICAgICAgICAgICAgb3ZlcnJpZGVuX2RhbWFnZV9tb2R1bGUuRGFtYWdlLmFwcGx5VG9UYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCBkYW1hZ2UpIHtcblxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbkRvYyA9IGNhbnZhcy5zY2VuZS50b2tlbnMuZ2V0KHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICAvLyBMaW5rZWQgdG8gQWN0b3JcbiAgICAgICAgICAgICAgICBpZiAodG9rZW5Eb2MuaXNMaW5rZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJtb3IgPSB0b2tlbkRvYy5hY3Rvci5zeXN0ZW0uYXJtb3I7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhwID0gdG9rZW5Eb2MuYWN0b3Iuc3lzdGVtLmhwLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHIgPSB0b2tlbkRvYy5hY3Rvci5zeXN0ZW0uYWJpbGl0aWVzLlNUUi52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeyBkbWcsIG5ld0hwLCBuZXdTdHIgfSA9IG92ZXJyaWRlbl9kYW1hZ2VfbW9kdWxlLkRhbWFnZS5fY2FsY3VsYXRlSHBBbmRTdHIoZGFtYWdlLCBhcm1vciwgaHAsIHN0cik7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuRG9jLmFjdG9yLnN5c3RlbS5ocC52YWx1ZSA9IG5ld0hwO1xuICAgICAgICAgICAgICAgICAgICB0b2tlbkRvYy5hY3Rvci5zeXN0ZW0uYWJpbGl0aWVzLlNUUi52YWx1ZSA9IG5ld1N0cjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RvciA9IHRva2VuRG9jLmFjdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGFjdG9yLCBkbWcsIGRhbWFnZSwgYXJtb3IsIGhwLCBzdHIsIG5ld0hwLCBuZXdTdHIgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBTeW50aGV0aWMgYWN0b3JcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFybW9yID0gdG9rZW5Eb2MuYWN0b3JEYXRhPy5zeXN0ZW0/LmFybW9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJtb3IgPT09IHVuZGVmaW5lZCkgYXJtb3IgPSB0b2tlbkRvYy5hY3Rvci5zeXN0ZW0uYXJtb3I7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGhwID0gdG9rZW5Eb2MuYWN0b3JEYXRhPy5zeXN0ZW0/LmhwPy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhwID09PSB1bmRlZmluZWQpIGhwID0gdG9rZW5Eb2MuYWN0b3Iuc3lzdGVtLmhwLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHIgPSB0b2tlbkRvYy5hY3RvckRhdGE/LnN5c3RlbT8uYWJpbGl0aWVzPy5TVFI/LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyID09PSB1bmRlZmluZWQpIHN0ciA9IHRva2VuRG9jLmFjdG9yLnN5c3RlbS5hYmlsaXRpZXMuU1RSLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB7IGRtZywgbmV3SHAsIG5ld1N0ciB9ID0gb3ZlcnJpZGVuX2RhbWFnZV9tb2R1bGUuRGFtYWdlLl9jYWxjdWxhdGVIcEFuZFN0cihkYW1hZ2UsIGFybW9yLCBocCwgc3RyKTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5Eb2MuYWN0b3Iuc3lzdGVtLmhwLnZhbHVlID0gbmV3SHA7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuRG9jLmFjdG9yLnN5c3RlbS5hYmlsaXRpZXMuU1RSLnZhbHVlID0gbmV3U3RyO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdG9yID0gdG9rZW5Eb2MuYWN0b3I7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgYWN0b3IsIGRtZywgZGFtYWdlLCBhcm1vciwgaHAsIHN0ciwgbmV3SHAsIG5ld1N0ciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgSG9va3Mub2ZmKFxuICAgICAgICAgICAgICAgIFwicmVuZGVyQ2hhdE1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICA0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBIb29rcy5vbihcInJlbmRlckNoYXRNZXNzYWdlXCIsIChtZXNzYWdlLCBodG1sLCBkYXRhKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBSb2xsIFN0ciBTYXZlXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdG9yID0gZ2FtZS5hY3RvcnM/LmdldChtZXNzYWdlLnNwZWFrZXI/LmFjdG9yKTtcblxuICAgICAgICAgICAgICAgIGlmIChhY3RvciAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IudGVzdFVzZXJQZXJtaXNzaW9uKGdhbWUudXNlciwgXCJPV05FUlwiKSB8fCBnYW1lLnVzZXIuaXNHTSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbC5maW5kKFwiLnJvbGwtc3RyLXNhdmVcIikuY2xpY2soZXYgPT4gb3ZlcnJpZGVuX2RhbWFnZV9tb2R1bGUuRGFtYWdlLl9yb2xsU3RyU2F2ZShhY3RvciwgaHRtbCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbC5maW5kKFwiLnJvbGwtc3RyLXNhdmVcIikuZWFjaCgoaSwgYnRuKSA9PiB7IGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbC5maW5kKFwiLnJvbGwtc3RyLXNhdmVcIikuZWFjaCgoaSwgYnRuKSA9PiB7IGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7IH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS51c2VyLmlzR00pIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbC5maW5kKFwiLmFwcGx5LWRtZ1wiKS5jbGljayhldiA9PiBvdmVycmlkZW5fZGFtYWdlX21vZHVsZS5EYW1hZ2Uub25DbGlja0NoYXRNZXNzYWdlQXBwbHlCdXR0b24oZXYsIGh0bWwsIGRhdGEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwuZmluZChcIi5hcHBseS1kbWdcIikuZWFjaCgoaSwgYnRuKSA9PiB7IGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gUGF0Y2hNYWNybygpIHtcbiAgICAoZ2FtZVtcImNhaXJuXCJdIGFzIGFueSkucm9sbEl0ZW1NYWNybyA9IGFzeW5jIChhY3RvcklkLCBpdGVtSWQpID0+IHtcbiAgICAgICAgY29uc3QgYWN0b3IgPSBnYW1lLmFjdG9ycyEuZ2V0KGFjdG9ySWQpO1xuICAgICAgICBjb25zdCBpdGVtID0gYWN0b3IhLml0ZW1zIS5nZXQoaXRlbUlkKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYoaXRlbT8uc3lzdGVtPy5lcXVwcGVkID09IGZhbHNlKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgIHJldHVybiB1aS5ub3RpZmljYXRpb25zLndhcm4oXCJUaGlzIHdlYXBvbiBpcyBub3QgZXF1aXBwZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYWJlbCA9IGdhbWUuaTE4bi5sb2NhbGl6ZShcIkNBSVJOLlJvbGxpbmdEbWdXaXRoXCIpICsgYCAke2l0ZW0hLm5hbWV9YDtcblxuICAgICAgICBjb25zdCB0YXJnZXRlZFRva2VucyA9IEFycmF5LmZyb20oZ2FtZS51c2VyIS50YXJnZXRzKS5tYXAodCA9PiB0LmlkKTtcblxuICAgICAgICBsZXQgdGFyZ2V0SWRzO1xuICAgICAgICBpZiAodGFyZ2V0ZWRUb2tlbnMubGVuZ3RoID09IDApIHRhcmdldElkcyA9IG51bGw7XG4gICAgICAgIGVsc2UgaWYgKHRhcmdldGVkVG9rZW5zLmxlbmd0aCA9PSAxKSB0YXJnZXRJZHMgPSB0YXJnZXRlZFRva2Vuc1swXTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRJZHMgPSB0YXJnZXRlZFRva2Vuc1swXTtcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCB0YXJnZXRlZFRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGFyZ2V0ZWRUb2tlbnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRhcmdldElkcyA9IHRhcmdldElkcy5jb25jYXQoXCI7XCIsIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvbGwgPSBuZXcgUm9sbCgoaXRlbSBhcyBhbnkpIS5zeXN0ZW0uZGFtYWdlRm9ybXVsYSwgYWN0b3IhLmdldFJvbGxEYXRhKCkpO1xuICAgICAgICByb2xsLmV2YWx1YXRlKCk7XG5cbiAgICAgICAgX2J1aWxkRGFtYWdlUm9sbE1lc3NhZ2UobGFiZWwsIHRhcmdldElkcykudGhlbigobXNnKSA9PiB7XG4gICAgICAgICAgICByb2xsLnRvTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgc3BlYWtlcjogQ2hhdE1lc3NhZ2UuZ2V0U3BlYWtlcih7IGFjdG9yOiBhY3RvciB9KSxcbiAgICAgICAgICAgICAgICBmbGF2b3I6IG1zZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIChnYW1lW1wiY2Fpcm5cIl0gYXMgYW55KS5yb2xsSXRlbU1hY3JvQWR2YW50YWdlID0gYXN5bmMgKGFjdG9ySWQpID0+IHtcbiAgICAgICAgY29uc3QgYWN0b3IgPSBnYW1lLmFjdG9ycyEuZ2V0KGFjdG9ySWQpO1xuXG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSBnYW1lLmkxOG4ubG9jYWxpemUoXCJDQUlSTi5Sb2xsaW5nRG1nV2l0aFwiKSArIGAgQWR2YW50YWdlYDtcblxuICAgICAgICBjb25zdCB0YXJnZXRlZFRva2VucyA9IEFycmF5LmZyb20oZ2FtZS51c2VyIS50YXJnZXRzKS5tYXAodCA9PiB0LmlkKTtcblxuICAgICAgICBsZXQgdGFyZ2V0SWRzO1xuICAgICAgICBpZiAodGFyZ2V0ZWRUb2tlbnMubGVuZ3RoID09IDApIHRhcmdldElkcyA9IG51bGw7XG4gICAgICAgIGVsc2UgaWYgKHRhcmdldGVkVG9rZW5zLmxlbmd0aCA9PSAxKSB0YXJnZXRJZHMgPSB0YXJnZXRlZFRva2Vuc1swXTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRJZHMgPSB0YXJnZXRlZFRva2Vuc1swXTtcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCB0YXJnZXRlZFRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGFyZ2V0ZWRUb2tlbnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRhcmdldElkcyA9IHRhcmdldElkcy5jb25jYXQoXCI7XCIsIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvbGwgPSBuZXcgUm9sbChcIjFkMTJcIiwgYWN0b3IhLmdldFJvbGxEYXRhKCkpO1xuICAgICAgICByb2xsLmV2YWx1YXRlKCk7XG5cbiAgICAgICAgX2J1aWxkRGFtYWdlUm9sbE1lc3NhZ2UobGFiZWwsIHRhcmdldElkcykudGhlbigobXNnKSA9PiB7XG4gICAgICAgICAgICByb2xsLnRvTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgc3BlYWtlcjogQ2hhdE1lc3NhZ2UuZ2V0U3BlYWtlcih7IGFjdG9yOiBhY3RvciB9KSxcbiAgICAgICAgICAgICAgICBmbGF2b3I6IG1zZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIChnYW1lW1wiY2Fpcm5cIl0gYXMgYW55KS5yb2xsSXRlbU1hY3JvRGlzYWR2YW50YWdlID0gYXN5bmMgKGFjdG9ySWQpID0+IHtcbiAgICAgICAgY29uc3QgYWN0b3IgPSBnYW1lLmFjdG9ycyEuZ2V0KGFjdG9ySWQpO1xuXG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSBnYW1lLmkxOG4ubG9jYWxpemUoXCJDQUlSTi5Sb2xsaW5nRG1nV2l0aFwiKSArIGAgRGlzYWR2YW50YWdlYDtcblxuICAgICAgICBjb25zdCB0YXJnZXRlZFRva2VucyA9IEFycmF5LmZyb20oZ2FtZS51c2VyIS50YXJnZXRzKS5tYXAodCA9PiB0LmlkKTtcblxuICAgICAgICBsZXQgdGFyZ2V0SWRzO1xuICAgICAgICBpZiAodGFyZ2V0ZWRUb2tlbnMubGVuZ3RoID09IDApIHRhcmdldElkcyA9IG51bGw7XG4gICAgICAgIGVsc2UgaWYgKHRhcmdldGVkVG9rZW5zLmxlbmd0aCA9PSAxKSB0YXJnZXRJZHMgPSB0YXJnZXRlZFRva2Vuc1swXTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRJZHMgPSB0YXJnZXRlZFRva2Vuc1swXTtcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCB0YXJnZXRlZFRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGFyZ2V0ZWRUb2tlbnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRhcmdldElkcyA9IHRhcmdldElkcy5jb25jYXQoXCI7XCIsIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvbGwgPSBuZXcgUm9sbChcIjFkNFwiLCBhY3RvciEuZ2V0Um9sbERhdGEoKSk7XG4gICAgICAgIHJvbGwuZXZhbHVhdGUoKTtcblxuICAgICAgICBfYnVpbGREYW1hZ2VSb2xsTWVzc2FnZShsYWJlbCwgdGFyZ2V0SWRzKS50aGVuKChtc2cpID0+IHtcbiAgICAgICAgICAgIHJvbGwudG9NZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBzcGVha2VyOiBDaGF0TWVzc2FnZS5nZXRTcGVha2VyKHsgYWN0b3I6IGFjdG9yIH0pLFxuICAgICAgICAgICAgICAgIGZsYXZvcjogbXNnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG59XG4iXSwic291cmNlUm9vdCI6IiJ9