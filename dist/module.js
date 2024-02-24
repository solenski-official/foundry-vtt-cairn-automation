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
    let macro = (_a = game.macros) === null || _a === void 0 ? void 0 : _a.find((m) => m.name === item.name + " Advantage" && m.command === command);
    if (!macro) {
        Macro.create({
            name: item.name + " Advantage",
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
    let macro = (_a = game.macros) === null || _a === void 0 ? void 0 : _a.find((m) => m.name === item.name + " Disadvantage" && m.command === command);
    if (!macro) {
        Macro.create({
            name: item.name + " Disadvantage",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGFjZWhvbGRlci8uL3NyYy9tb2R1bGUvaGVscGVyL1RlbXBsYXRlUHJlbG9hZGVyLnRzIiwid2VicGFjazovL3BsYWNlaG9sZGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsYWNlaG9sZGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGFjZWhvbGRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsYWNlaG9sZGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGxhY2Vob2xkZXIvLi9zcmMvY2FyaW4tYXV0b21hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLENBQUM7QUFFTSxNQUFNLGlCQUFpQjtJQUMxQjs7T0FFRztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCO1FBQ25DLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QixPQUFPLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0o7Ozs7Ozs7VUNWRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05zRTtBQUt0RSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDMUIsSUFBSSx1QkFBdUIsQ0FB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QUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDOUM7U0FDSjtRQUNELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEIsdUJBQXVCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsT0FBTyxFQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQ2pELE1BQU0sRUFBRSxHQUFHO2FBQ2QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDLENBQUM7QUFFTixDQUFDIiwiZmlsZSI6Im1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjtcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlUHJlbG9hZGVyIHtcbiAgICAvKipcbiAgICAgKiBQcmVsb2FkIGEgc2V0IG9mIHRlbXBsYXRlcyB0byBjb21waWxlIGFuZCBjYWNoZSB0aGVtIGZvciBmYXN0IGFjY2VzcyBkdXJpbmcgcmVuZGVyaW5nXG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIHByZWxvYWRIYW5kbGViYXJzVGVtcGxhdGVzKCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZVBhdGhzID0gW107XG4gICAgICAgIHJldHVybiBsb2FkVGVtcGxhdGVzKHRlbXBsYXRlUGF0aHMpO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVGVtcGxhdGVQcmVsb2FkZXIgfSBmcm9tIFwiLi9tb2R1bGUvaGVscGVyL1RlbXBsYXRlUHJlbG9hZGVyXCI7XG5cbmRlY2xhcmUgZnVuY3Rpb24gZnJvbVV1aWRTeW5jKHV1aWQ6IHN0cmluZyk6ICBvYmplY3QgfCBFbnRpdHk8RW50aXR5LkRhdGEsIEVudGl0eS5EYXRhPiB8IG51bGxcblxuXG5DT05GSUcuZGVidWcuaG9va3MgPSB0cnVlO1xubGV0IG92ZXJyaWRlbl9kYW1hZ2VfbW9kdWxlO1xubGV0IG1vZHVsZV9pbXBvcnRfcHJvbWlzZTogUHJvbWlzZTxhbnk+IFxuSG9va3Mub25jZShcImluaXRcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1ITVI9PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpXG59KTtcblxuXG5cbmZ1bmN0aW9uIF9idWlsZERhbWFnZVJvbGxNZXNzYWdlKGxhYmVsLCB0YXJnZXRJZHMpIHtcbiAgICBjb25zdCByb2xsTWVzc2FnZVRwbCA9ICdzeXN0ZW1zL2NhaXJuL3RlbXBsYXRlcy9jaGF0L2RtZy1yb2xsLWNhcmQuaHRtbCc7ICAgXG4gICAgY29uc3QgdHBsRGF0YSA9IHtsYWJlbDogbGFiZWwsIHRhcmdldHM6IHRhcmdldElkc307XG4gICAgY29uc29sZS5sb2codHBsRGF0YSlcbiAgICByZXR1cm4gcmVuZGVyVGVtcGxhdGUocm9sbE1lc3NhZ2VUcGwsIHRwbERhdGEpO1xufVxuXG5cblxuSG9va3Mub25jZShcInJlYWR5XCIsICAoKSA9PiB7XG4gICAgUGF0Y2hNYWNybygpO1xuICAgIFBhdGNoRGFtYWdlKCk7XG4gICAgUGF0Y2hIb3RiYXIoKTtcblxufSk7XG5cblxuXG5cblxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG5cbiAgICAgICAgaWYgKG1vZHVsZS5ob3Quc3RhdHVzKCkgPT09IFwiYXBwbHlcIikge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0ZW1wbGF0ZSBpbiBfdGVtcGxhdGVDYWNoZSkge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX3RlbXBsYXRlQ2FjaGUsIHRlbXBsYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX3RlbXBsYXRlQ2FjaGVbdGVtcGxhdGVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgVGVtcGxhdGVQcmVsb2FkZXIucHJlbG9hZEhhbmRsZWJhcnNUZW1wbGF0ZXMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGFwcGxpY2F0aW9uIGluIHVpLndpbmRvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh1aS53aW5kb3dzLCBhcHBsaWNhdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpLndpbmRvd3NbYXBwbGljYXRpb25dLnJlbmRlcih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBQYXRjaEhvdGJhcigpIHtcbiAgICBIb29rcy5vZmYoXCJob3RiYXJEcm9wXCIsOClcbiAgICBIb29rcy5vbihcbiAgICAgICAgXCJob3RiYXJEcm9wXCIsIChfLCBkcm9wRGF0YTogeyB1dWlkOyB0eXBlOyBzY2VuZUlkOyBhY3RvcklkOyB0b2tlbklkOyB9LCBzbG90KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtRnJvbVV1aWQgPSBmcm9tVXVpZFN5bmMoZHJvcERhdGEudXVpZCk7XG4gICAgICAgICAgICBjb25zdCBhY3RvciA9IGl0ZW1Gcm9tVXVpZFxuICAgICAgICAgICAgICAgID8gKGl0ZW1Gcm9tVXVpZCBhcyBhbnkpLmFjdG9yXG4gICAgICAgICAgICAgICAgOiBkcm9wRGF0YS5zY2VuZUlkXG4gICAgICAgICAgICAgICAgICAgID8gKGdhbWUuc2NlbmVzIGFzIGFueSk/LmdldChkcm9wRGF0YS5zY2VuZUlkKT8udG9rZW5zPy5nZXQoZHJvcERhdGEudG9rZW5JZCkuYWN0b3JcbiAgICAgICAgICAgICAgICAgICAgOiBnYW1lLmFjdG9ycz8uZ2V0KGRyb3BEYXRhLmFjdG9ySWQpO1xuXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gYWN0b3IgPyAoaXRlbUZyb21VdWlkID8gaXRlbUZyb21VdWlkIDogYWN0b3IuaXRlbXMuZ2V0KChkcm9wRGF0YSBhcyBhbnkpLmRhdGEuX2lkKSkgOiBudWxsO1xuXG4gICAgICAgICAgICBpZiAoZHJvcERhdGE/LnR5cGUgIT09IFwiSXRlbVwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWFjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVpLm5vdGlmaWNhdGlvbnM/Lndhcm4oXCJZb3UgY2FuIG9ubHkgY3JlYXRlIG1hY3JvIGJ1dHRvbnMgZm9yIG93bmVkIEl0ZW1zXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlICE9PSBcIndlYXBvblwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjcmVhdGVNYWNybyhhY3RvciwgaXRlbSwgc2xvdCk7XG4gICAgICAgICAgICBjcmVhdGVNYWNyb0FkdihhY3RvciwgaXRlbSk7XG4gICAgICAgICAgICBjcmVhdGVNYWNyb0RpcyhhY3RvciwgaXRlbSk7XG5cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWFjcm9BZHYoYWN0b3I6IGFueSwgaXRlbTogYW55KSB7XG4gICAgY29uc3QgY29tbWFuZCA9IGBnYW1lLmNhaXJuLnJvbGxJdGVtTWFjcm9BZHZhbnRhZ2UoXCIke2FjdG9yLmlkfVwiKTtgO1xuICAgIGxldCBtYWNybyA9IGdhbWUubWFjcm9zPy5maW5kKChtKSA9PiBtLm5hbWUgPT09IGl0ZW0ubmFtZSArIFwiIEFkdmFudGFnZVwiICYmIChtIGFzIGFueSkuY29tbWFuZCA9PT0gY29tbWFuZCk7XG4gICAgaWYgKCFtYWNybykge1xuICAgICAgICBNYWNyby5jcmVhdGUoe1xuICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lICsgXCIgQWR2YW50YWdlXCIsXG4gICAgICAgICAgICB0eXBlOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgaW1nOiBpdGVtLmltZyxcbiAgICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgICBmbGFnczogeyBcImNhaXJuLml0ZW1NYWNyb1wiOiB0cnVlIH0sXG4gICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICBuZXdfbWFjcm8gPT4gZ2FtZS51c2VyPy5hc3NpZ25Ib3RiYXJNYWNybyhuZXdfbWFjcm8sIDkpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGlmIChtYWNybylcbiAgICAgICAgZ2FtZS51c2VyPy5hc3NpZ25Ib3RiYXJNYWNybyhtYWNybywgOSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hY3JvRGlzKGFjdG9yOiBhbnksIGl0ZW06IGFueSkge1xuICAgIGNvbnN0IGNvbW1hbmQgPSBgZ2FtZS5jYWlybi5yb2xsSXRlbU1hY3JvRGlzYWR2YW50YWdlKFwiJHthY3Rvci5pZH1cIik7YDtcbiAgICBsZXQgbWFjcm8gPSBnYW1lLm1hY3Jvcz8uZmluZCgobSkgPT4gbS5uYW1lID09PSBpdGVtLm5hbWUgKyBcIiBEaXNhZHZhbnRhZ2VcIiAmJiAobSBhcyBhbnkpLmNvbW1hbmQgPT09IGNvbW1hbmQpO1xuICAgIGlmICghbWFjcm8pIHtcbiAgICAgICAgTWFjcm8uY3JlYXRlKHtcbiAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSArIFwiIERpc2FkdmFudGFnZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgICAgIGltZzogaXRlbS5pbWcsXG4gICAgICAgICAgICBjb21tYW5kLFxuICAgICAgICAgICAgZmxhZ3M6IHsgXCJjYWlybi5pdGVtTWFjcm9cIjogdHJ1ZSB9LFxuICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgbmV3X21hY3JvID0+IGdhbWUudXNlcj8uYXNzaWduSG90YmFyTWFjcm8obmV3X21hY3JvLCAxMClcbiAgICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1hY3JvKVxuICAgICAgICBnYW1lLnVzZXI/LmFzc2lnbkhvdGJhck1hY3JvKG1hY3JvLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hY3JvKGFjdG9yOiBhbnksIGl0ZW06IGFueSwgc2xvdDogc3RyaW5nKSB7XG4gICAgY29uc3QgY29tbWFuZCA9IGBnYW1lLmNhaXJuLnJvbGxJdGVtTWFjcm8oXCIke2FjdG9yLmlkfVwiLCBcIiR7aXRlbS5pZH1cIik7YDtcbiAgICBsZXQgbWFjcm8gPSBnYW1lLm1hY3Jvcz8uZmluZCgobSkgPT4gbS5uYW1lID09PSBpdGVtLm5hbWUgJiYgKG0gYXMgYW55KS5jb21tYW5kID09PSBjb21tYW5kKTtcbiAgICBpZiAoIW1hY3JvKSB7XG4gICAgICAgIE1hY3JvLmNyZWF0ZSh7XG4gICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICB0eXBlOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgaW1nOiBpdGVtLmltZyxcbiAgICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgICBmbGFnczogeyBcImNhaXJuLml0ZW1NYWNyb1wiOiB0cnVlIH0sXG4gICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICBuZXdfbWFjcm8gPT4gZ2FtZS51c2VyPy5hc3NpZ25Ib3RiYXJNYWNybyhuZXdfbWFjcm8sIHNsb3QpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGlmIChtYWNybylcbiAgICAgICAgZ2FtZS51c2VyPy5hc3NpZ25Ib3RiYXJNYWNybyhtYWNybywgc2xvdCk7XG59XG5cbmZ1bmN0aW9uIFBhdGNoRGFtYWdlKCkge1xuICAgIGV2YWwoYG1vZHVsZV9pbXBvcnRfcHJvbWlzZSA9IGltcG9ydCgnL3N5c3RlbXMvY2Fpcm4vbW9kdWxlL2RhbWFnZS5qcycpYCk7XG4gICAgbW9kdWxlX2ltcG9ydF9wcm9taXNlLnRoZW4oXG4gICAgICAgIChtKSA9PiB7XG4gICAgICAgICAgICBvdmVycmlkZW5fZGFtYWdlX21vZHVsZSA9IG07XG5cbiAgICAgICAgICAgIG92ZXJyaWRlbl9kYW1hZ2VfbW9kdWxlLkRhbWFnZS5hcHBseVRvVGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgZGFtYWdlKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW5Eb2MgPSBjYW52YXMuc2NlbmUudG9rZW5zLmdldCh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgLy8gTGlua2VkIHRvIEFjdG9yXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuRG9jLmlzTGlua2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFybW9yID0gdG9rZW5Eb2MuYWN0b3Iuc3lzdGVtLmFybW9yO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBocCA9IHRva2VuRG9jLmFjdG9yLnN5c3RlbS5ocC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyID0gdG9rZW5Eb2MuYWN0b3Iuc3lzdGVtLmFiaWxpdGllcy5TVFIudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHsgZG1nLCBuZXdIcCwgbmV3U3RyIH0gPSBvdmVycmlkZW5fZGFtYWdlX21vZHVsZS5EYW1hZ2UuX2NhbGN1bGF0ZUhwQW5kU3RyKGRhbWFnZSwgYXJtb3IsIGhwLCBzdHIpO1xuICAgICAgICAgICAgICAgICAgICB0b2tlbkRvYy5hY3Rvci5zeXN0ZW0uaHAudmFsdWUgPSBuZXdIcDtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5Eb2MuYWN0b3Iuc3lzdGVtLmFiaWxpdGllcy5TVFIudmFsdWUgPSBuZXdTdHI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0b3IgPSB0b2tlbkRvYy5hY3RvcjtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBhY3RvciwgZG1nLCBkYW1hZ2UsIGFybW9yLCBocCwgc3RyLCBuZXdIcCwgbmV3U3RyIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gU3ludGhldGljIGFjdG9yXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcm1vciA9IHRva2VuRG9jLmFjdG9yRGF0YT8uc3lzdGVtPy5hcm1vcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFybW9yID09PSB1bmRlZmluZWQpIGFybW9yID0gdG9rZW5Eb2MuYWN0b3Iuc3lzdGVtLmFybW9yO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBocCA9IHRva2VuRG9jLmFjdG9yRGF0YT8uc3lzdGVtPy5ocD8udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChocCA9PT0gdW5kZWZpbmVkKSBocCA9IHRva2VuRG9jLmFjdG9yLnN5c3RlbS5ocC52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyID0gdG9rZW5Eb2MuYWN0b3JEYXRhPy5zeXN0ZW0/LmFiaWxpdGllcz8uU1RSPy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ciA9PT0gdW5kZWZpbmVkKSBzdHIgPSB0b2tlbkRvYy5hY3Rvci5zeXN0ZW0uYWJpbGl0aWVzLlNUUi52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeyBkbWcsIG5ld0hwLCBuZXdTdHIgfSA9IG92ZXJyaWRlbl9kYW1hZ2VfbW9kdWxlLkRhbWFnZS5fY2FsY3VsYXRlSHBBbmRTdHIoZGFtYWdlLCBhcm1vciwgaHAsIHN0cik7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuRG9jLmFjdG9yLnN5c3RlbS5ocC52YWx1ZSA9IG5ld0hwO1xuICAgICAgICAgICAgICAgICAgICB0b2tlbkRvYy5hY3Rvci5zeXN0ZW0uYWJpbGl0aWVzLlNUUi52YWx1ZSA9IG5ld1N0cjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RvciA9IHRva2VuRG9jLmFjdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGFjdG9yLCBkbWcsIGRhbWFnZSwgYXJtb3IsIGhwLCBzdHIsIG5ld0hwLCBuZXdTdHIgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIEhvb2tzLm9mZihcbiAgICAgICAgICAgICAgICBcInJlbmRlckNoYXRNZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgNFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgSG9va3Mub24oXCJyZW5kZXJDaGF0TWVzc2FnZVwiLCAobWVzc2FnZSwgaHRtbCwgZGF0YSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gUm9sbCBTdHIgU2F2ZVxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RvciA9IGdhbWUuYWN0b3JzPy5nZXQobWVzc2FnZS5zcGVha2VyPy5hY3Rvcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0b3IgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLnRlc3RVc2VyUGVybWlzc2lvbihnYW1lLnVzZXIsIFwiT1dORVJcIikgfHwgZ2FtZS51c2VyLmlzR00pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwuZmluZChcIi5yb2xsLXN0ci1zYXZlXCIpLmNsaWNrKGV2ID0+IG92ZXJyaWRlbl9kYW1hZ2VfbW9kdWxlLkRhbWFnZS5fcm9sbFN0clNhdmUoYWN0b3IsIGh0bWwpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwuZmluZChcIi5yb2xsLXN0ci1zYXZlXCIpLmVhY2goKGksIGJ0bikgPT4geyBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwuZmluZChcIi5yb2xsLXN0ci1zYXZlXCIpLmVhY2goKGksIGJ0bikgPT4geyBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUudXNlci5pc0dNKSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwuZmluZChcIi5hcHBseS1kbWdcIikuY2xpY2soZXYgPT4gb3ZlcnJpZGVuX2RhbWFnZV9tb2R1bGUuRGFtYWdlLm9uQ2xpY2tDaGF0TWVzc2FnZUFwcGx5QnV0dG9uKGV2LCBodG1sLCBkYXRhKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBodG1sLmZpbmQoXCIuYXBwbHktZG1nXCIpLmVhY2goKGksIGJ0bikgPT4geyBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIFBhdGNoTWFjcm8oKSB7XG4gICAgKGdhbWVbXCJjYWlyblwiXSBhcyBhbnkpLnJvbGxJdGVtTWFjcm8gPSBhc3luYyAoYWN0b3JJZCwgaXRlbUlkKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdG9yID0gZ2FtZS5hY3RvcnMhLmdldChhY3RvcklkKTtcbiAgICAgICAgY29uc3QgaXRlbSA9IGFjdG9yIS5pdGVtcyEuZ2V0KGl0ZW1JZCk7XG4gICAgICAgIFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmKGl0ZW0/LnN5c3RlbT8uZXF1cHBlZCA9PSBmYWxzZSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICByZXR1cm4gdWkubm90aWZpY2F0aW9ucy53YXJuKFwiVGhpcyB3ZWFwb24gaXMgbm90IGVxdWlwcGVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSBnYW1lLmkxOG4ubG9jYWxpemUoXCJDQUlSTi5Sb2xsaW5nRG1nV2l0aFwiKSArIGAgJHtpdGVtIS5uYW1lfWA7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ZWRUb2tlbnMgPSBBcnJheS5mcm9tKGdhbWUudXNlciEudGFyZ2V0cykubWFwKHQgPT4gdC5pZCk7XG5cbiAgICAgICAgbGV0IHRhcmdldElkcztcbiAgICAgICAgaWYgKHRhcmdldGVkVG9rZW5zLmxlbmd0aCA9PSAwKSB0YXJnZXRJZHMgPSBudWxsO1xuICAgICAgICBlbHNlIGlmICh0YXJnZXRlZFRva2Vucy5sZW5ndGggPT0gMSkgdGFyZ2V0SWRzID0gdGFyZ2V0ZWRUb2tlbnNbMF07XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0SWRzID0gdGFyZ2V0ZWRUb2tlbnNbMF07XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgdGFyZ2V0ZWRUb2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRhcmdldGVkVG9rZW5zW2luZGV4XTtcbiAgICAgICAgICAgICAgICB0YXJnZXRJZHMgPSB0YXJnZXRJZHMuY29uY2F0KFwiO1wiLCBlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb2xsID0gbmV3IFJvbGwoKGl0ZW0gYXMgYW55KSEuc3lzdGVtLmRhbWFnZUZvcm11bGEsIGFjdG9yIS5nZXRSb2xsRGF0YSgpKTtcbiAgICAgICAgcm9sbC5ldmFsdWF0ZSgpO1xuXG4gICAgICAgIF9idWlsZERhbWFnZVJvbGxNZXNzYWdlKGxhYmVsLCB0YXJnZXRJZHMpLnRoZW4oKG1zZykgPT4ge1xuICAgICAgICAgICAgcm9sbC50b01lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHNwZWFrZXI6IENoYXRNZXNzYWdlLmdldFNwZWFrZXIoeyBhY3RvcjogYWN0b3IgfSksXG4gICAgICAgICAgICAgICAgZmxhdm9yOiBtc2dcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAoZ2FtZVtcImNhaXJuXCJdIGFzIGFueSkucm9sbEl0ZW1NYWNyb0FkdmFudGFnZSA9IGFzeW5jIChhY3RvcklkKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdG9yID0gZ2FtZS5hY3RvcnMhLmdldChhY3RvcklkKTtcblxuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gZ2FtZS5pMThuLmxvY2FsaXplKFwiQ0FJUk4uUm9sbGluZ0RtZ1dpdGhcIikgKyBgIEFkdmFudGFnZWA7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ZWRUb2tlbnMgPSBBcnJheS5mcm9tKGdhbWUudXNlciEudGFyZ2V0cykubWFwKHQgPT4gdC5pZCk7XG5cbiAgICAgICAgbGV0IHRhcmdldElkcztcbiAgICAgICAgaWYgKHRhcmdldGVkVG9rZW5zLmxlbmd0aCA9PSAwKSB0YXJnZXRJZHMgPSBudWxsO1xuICAgICAgICBlbHNlIGlmICh0YXJnZXRlZFRva2Vucy5sZW5ndGggPT0gMSkgdGFyZ2V0SWRzID0gdGFyZ2V0ZWRUb2tlbnNbMF07XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0SWRzID0gdGFyZ2V0ZWRUb2tlbnNbMF07XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgdGFyZ2V0ZWRUb2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRhcmdldGVkVG9rZW5zW2luZGV4XTtcbiAgICAgICAgICAgICAgICB0YXJnZXRJZHMgPSB0YXJnZXRJZHMuY29uY2F0KFwiO1wiLCBlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb2xsID0gbmV3IFJvbGwoXCIxZDEyXCIsIGFjdG9yIS5nZXRSb2xsRGF0YSgpKTtcbiAgICAgICAgcm9sbC5ldmFsdWF0ZSgpO1xuXG4gICAgICAgIF9idWlsZERhbWFnZVJvbGxNZXNzYWdlKGxhYmVsLCB0YXJnZXRJZHMpLnRoZW4oKG1zZykgPT4ge1xuICAgICAgICAgICAgcm9sbC50b01lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHNwZWFrZXI6IENoYXRNZXNzYWdlLmdldFNwZWFrZXIoeyBhY3RvcjogYWN0b3IgfSksXG4gICAgICAgICAgICAgICAgZmxhdm9yOiBtc2dcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAoZ2FtZVtcImNhaXJuXCJdIGFzIGFueSkucm9sbEl0ZW1NYWNyb0Rpc2FkdmFudGFnZSA9IGFzeW5jIChhY3RvcklkKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdG9yID0gZ2FtZS5hY3RvcnMhLmdldChhY3RvcklkKTtcblxuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gZ2FtZS5pMThuLmxvY2FsaXplKFwiQ0FJUk4uUm9sbGluZ0RtZ1dpdGhcIikgKyBgIERpc2FkdmFudGFnZWA7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ZWRUb2tlbnMgPSBBcnJheS5mcm9tKGdhbWUudXNlciEudGFyZ2V0cykubWFwKHQgPT4gdC5pZCk7XG5cbiAgICAgICAgbGV0IHRhcmdldElkcztcbiAgICAgICAgaWYgKHRhcmdldGVkVG9rZW5zLmxlbmd0aCA9PSAwKSB0YXJnZXRJZHMgPSBudWxsO1xuICAgICAgICBlbHNlIGlmICh0YXJnZXRlZFRva2Vucy5sZW5ndGggPT0gMSkgdGFyZ2V0SWRzID0gdGFyZ2V0ZWRUb2tlbnNbMF07XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0SWRzID0gdGFyZ2V0ZWRUb2tlbnNbMF07XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgdGFyZ2V0ZWRUb2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRhcmdldGVkVG9rZW5zW2luZGV4XTtcbiAgICAgICAgICAgICAgICB0YXJnZXRJZHMgPSB0YXJnZXRJZHMuY29uY2F0KFwiO1wiLCBlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb2xsID0gbmV3IFJvbGwoXCIxZDRcIiwgYWN0b3IhLmdldFJvbGxEYXRhKCkpO1xuICAgICAgICByb2xsLmV2YWx1YXRlKCk7XG5cbiAgICAgICAgX2J1aWxkRGFtYWdlUm9sbE1lc3NhZ2UobGFiZWwsIHRhcmdldElkcykudGhlbigobXNnKSA9PiB7XG4gICAgICAgICAgICByb2xsLnRvTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgc3BlYWtlcjogQ2hhdE1lc3NhZ2UuZ2V0U3BlYWtlcih7IGFjdG9yOiBhY3RvciB9KSxcbiAgICAgICAgICAgICAgICBmbGF2b3I6IG1zZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==