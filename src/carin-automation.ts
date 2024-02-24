import { TemplatePreloader } from "./module/helper/TemplatePreloader";

declare function fromUuidSync(uuid: string):  object | Entity<Entity.Data, Entity.Data> | null


CONFIG.debug.hooks = true;
let overriden_damage_module;
let module_import_promise: Promise<any> 
Hooks.once("init", async () => {
    console.log("=============================HMR============================")
});



function _buildDamageRollMessage(label, targetIds) {
    const rollMessageTpl = 'systems/cairn/templates/chat/dmg-roll-card.html';   
    const tplData = {label: label, targets: targetIds};
    console.log(tplData)
    return renderTemplate(rollMessageTpl, tplData);
}



Hooks.once("ready",  () => {
    PatchMacro();
    PatchDamage();
    PatchHotbar();

});






if (process.env.NODE_ENV === "development") {
    if (module.hot) {
        module.hot.accept();

        if (module.hot.status() === "apply") {
            for (const template in _templateCache) {
                if (Object.prototype.hasOwnProperty.call(_templateCache, template)) {
                    delete _templateCache[template];
                }
            }

            TemplatePreloader.preloadHandlebarsTemplates().then(() => {
                for (const application in ui.windows) {
                    if (Object.prototype.hasOwnProperty.call(ui.windows, application)) {
                        ui.windows[application].render(true);
                    }
                }
            });
        }
    }
}

function PatchHotbar() {
    Hooks.off("hotbarDrop",8)
    Hooks.on(
        "hotbarDrop", (_, dropData: { uuid; type; sceneId; actorId; tokenId; }, slot) => {
            const itemFromUuid = fromUuidSync(dropData.uuid);
            const actor = itemFromUuid
                ? (itemFromUuid as any).actor
                : dropData.sceneId
                    ? (game.scenes as any)?.get(dropData.sceneId)?.tokens?.get(dropData.tokenId).actor
                    : game.actors?.get(dropData.actorId);

            const item = actor ? (itemFromUuid ? itemFromUuid : actor.items.get((dropData as any).data._id)) : null;

            if (dropData?.type !== "Item") {
                return;
            }

            if (!actor) {
                return ui.notifications?.warn("You can only create macro buttons for owned Items");
            }

            if (item.type !== "weapon") {
                return;
            }

            createMacro(actor, item, slot);
            createMacroAdv(actor, item);
            createMacroDis(actor, item);


            return false;
        }
    );
}

function createMacroAdv(actor: any, item: any) {
    const command = `game.cairn.rollItemMacroAdvantage("${actor.id}");`;
    let macro = game.macros?.find((m) => m.name === item.name + " Advantage" && (m as any).command === command);
    if (!macro) {
        Macro.create({
            name: item.name + " Advantage",
            type: "script",
            img: item.img,
            command,
            flags: { "cairn.itemMacro": true },
        }).then(
            new_macro => game.user?.assignHotbarMacro(new_macro, 9)
        );
    }
    if (macro)
        game.user?.assignHotbarMacro(macro, 9);
}

function createMacroDis(actor: any, item: any) {
    const command = `game.cairn.rollItemMacroDisadvantage("${actor.id}");`;
    let macro = game.macros?.find((m) => m.name === item.name + " Disadvantage" && (m as any).command === command);
    if (!macro) {
        Macro.create({
            name: item.name + " Disadvantage",
            type: "script",
            img: item.img,
            command,
            flags: { "cairn.itemMacro": true },
        }).then(
            new_macro => game.user?.assignHotbarMacro(new_macro, 10)
        );
    }
    if (macro)
        game.user?.assignHotbarMacro(macro, 10);
}

function createMacro(actor: any, item: any, slot: string) {
    const command = `game.cairn.rollItemMacro("${actor.id}", "${item.id}");`;
    let macro = game.macros?.find((m) => m.name === item.name && (m as any).command === command);
    if (!macro) {
        Macro.create({
            name: item.name,
            type: "script",
            img: item.img,
            command,
            flags: { "cairn.itemMacro": true },
        }).then(
            new_macro => game.user?.assignHotbarMacro(new_macro, slot)
        );
    }
    if (macro)
        game.user?.assignHotbarMacro(macro, slot);
}

function PatchDamage() {
    eval(`module_import_promise = import('/systems/cairn/module/damage.js')`);
    module_import_promise.then(
        (m) => {
            overriden_damage_module = m;

            overriden_damage_module.Damage.applyToTarget = function (target, damage) {

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
                    let armor = tokenDoc.actorData?.system?.armor;
                    if (armor === undefined) armor = tokenDoc.actor.system.armor;

                    let hp = tokenDoc.actorData?.system?.hp?.value;
                    if (hp === undefined) hp = tokenDoc.actor.system.hp.value;

                    let str = tokenDoc.actorData?.system?.abilities?.STR?.value;
                    if (str === undefined) str = tokenDoc.actor.system.abilities.STR.value;

                    let { dmg, newHp, newStr } = overriden_damage_module.Damage._calculateHpAndStr(damage, armor, hp, str);
                    tokenDoc.actor.system.hp.value = newHp;
                    tokenDoc.actor.system.abilities.STR.value = newStr;

                    const actor = tokenDoc.actor;

                    return { actor, dmg, damage, armor, hp, str, newHp, newStr };
                }
            };


            Hooks.off(
                "renderChatMessage",
                4
            );

            Hooks.on("renderChatMessage", (message, html, data) => {

                // Roll Str Save
                // @ts-ignore
                const actor = game.actors?.get(message.speaker?.actor);

                if (actor !== undefined) {

                    // @ts-ignore
                    if (actor.testUserPermission(game.user, "OWNER") || game.user.isGM) {
                        html.find(".roll-str-save").click(ev => overriden_damage_module.Damage._rollStrSave(actor, html));
                    } else {
                        html.find(".roll-str-save").each((i, btn) => { btn.style.display = "none"; });
                    }
                } else {
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
        }
    );
}

function PatchMacro() {
    (game["cairn"] as any).rollItemMacro = async (actorId, itemId) => {
        const actor = game.actors!.get(actorId);
        const item = actor!.items!.get(itemId);
        
        // @ts-ignore
        if(item?.system?.equpped == false)
        {
            // @ts-ignore
           return ui.notifications.warn("This weapon is not equipped");
        }

        const label = game.i18n.localize("CAIRN.RollingDmgWith") + ` ${item!.name}`;

        const targetedTokens = Array.from(game.user!.targets).map(t => t.id);

        let targetIds;
        if (targetedTokens.length == 0) targetIds = null;
        else if (targetedTokens.length == 1) targetIds = targetedTokens[0];
        else {
            targetIds = targetedTokens[0];
            for (let index = 1; index < targetedTokens.length; index++) {
                const element = targetedTokens[index];
                targetIds = targetIds.concat(";", element);
            }
        }
        const roll = new Roll((item as any)!.system.damageFormula, actor!.getRollData());
        roll.evaluate();

        _buildDamageRollMessage(label, targetIds).then((msg) => {
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                flavor: msg
            });
        });

    };

    (game["cairn"] as any).rollItemMacroAdvantage = async (actorId) => {
        const actor = game.actors!.get(actorId);


        const label = game.i18n.localize("CAIRN.RollingDmgWith") + ` Advantage`;

        const targetedTokens = Array.from(game.user!.targets).map(t => t.id);

        let targetIds;
        if (targetedTokens.length == 0) targetIds = null;
        else if (targetedTokens.length == 1) targetIds = targetedTokens[0];
        else {
            targetIds = targetedTokens[0];
            for (let index = 1; index < targetedTokens.length; index++) {
                const element = targetedTokens[index];
                targetIds = targetIds.concat(";", element);
            }
        }
        const roll = new Roll("1d12", actor!.getRollData());
        roll.evaluate();

        _buildDamageRollMessage(label, targetIds).then((msg) => {
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                flavor: msg
            });
        });

    };

    (game["cairn"] as any).rollItemMacroDisadvantage = async (actorId) => {
        const actor = game.actors!.get(actorId);


        const label = game.i18n.localize("CAIRN.RollingDmgWith") + ` Disadvantage`;

        const targetedTokens = Array.from(game.user!.targets).map(t => t.id);

        let targetIds;
        if (targetedTokens.length == 0) targetIds = null;
        else if (targetedTokens.length == 1) targetIds = targetedTokens[0];
        else {
            targetIds = targetedTokens[0];
            for (let index = 1; index < targetedTokens.length; index++) {
                const element = targetedTokens[index];
                targetIds = targetIds.concat(";", element);
            }
        }
        const roll = new Roll("1d4", actor!.getRollData());
        roll.evaluate();

        _buildDamageRollMessage(label, targetIds).then((msg) => {
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                flavor: msg
            });
        });

    };

}
