import { TemplatePreloader } from "./module/helper/TemplatePreloader";

declare function fromUuidSync(uuid: string):  object | Entity<Entity.Data, Entity.Data> | null

CONFIG.debug.hooks = true;

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
    (game["cairn"]as any).rollItemMacro = async (actorId, itemId) => {
    const actor = game.actors!.get(actorId);
    const item = actor!.items!.get(itemId);


    const label = game.i18n.localize("CAIRN.RollingDmgWith") + ` ${item!.name}` 

    const targetedTokens = Array.from(game.user!.targets).map(t => t.id);

    let targetIds;
    if (targetedTokens.length == 0) targetIds = null;
    else if (targetedTokens.length == 1) targetIds = targetedTokens[0];
    else {
      targetIds = targetedTokens[0];
      for (let index = 1; index < targetedTokens.length; index++) {
        const element = targetedTokens[index];
        targetIds = targetIds.concat(";",element);
      }
    }
    const roll = new Roll((item as any)!.system.damageFormula,  actor!.getRollData());
    roll.evaluate();
    
    _buildDamageRollMessage(label, targetIds).then((msg) => {
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: actor }),
          flavor: msg
        });
      });

    }
});


Hooks.on(
    "hotbarDrop", (_, dropData : { uuid, type, sceneId, actorId, tokenId }, slot) => {
        const itemFromUuid = fromUuidSync(dropData.uuid) 
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
            return
          }
        
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
            )
          }
          if(macro)
          game.user?.assignHotbarMacro(macro, slot)
          return false;
      }
)



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