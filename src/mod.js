/* 
 * authors: Revingly
*/

const coreMod = CoreMod.mod;

class MICC {
    constructor() {
        this.mod = "Revingly-MICC";
        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.Start.bind(this);
    }

    Start() {
        const MEDS = "543be5664bdc2dd4348b4569";
        const SMALL_SICC_ID = "5d235bb686f77443f4331278";

        const itemId = "Revingly_MICC",
            itemCategory = "5795f317245977243854e041",
            itemFleaPrice = 100000,
            itemPrefabPath = "micc.bundle",
            itemName = "Medical SICC",
            itemShortName = "MICC",
            itemDescription = "SICC for med items",
            itemTrader = "54cb57776803fa99248b456e", //Thrapist
            itemTraderPrice = 100000,
            itemTraderCurrency = "RUB",
            itemTraderLV = 1;

        const item = JsonUtil.clone(DatabaseServer.tables.templates.items[SMALL_SICC_ID]);
        item._id = itemId;
        item._props.Prefab.path = itemPrefabPath;
        item._props.Grids[0]._props.filters[0].Filter = [MEDS]; // allow only meds stuff
        item._props.Grids[0]._props.cellsH = 4;
        item._props.Grids[0]._props.cellsV = 4;
        DatabaseServer.tables.templates.items[itemId] = item;

        coreMod.CreateNewItemLocale("en", itemId, itemName, itemShortName, itemDescription);
        coreMod.CreateHandbookItem(itemId, itemCategory, itemFleaPrice);
        coreMod.CreateTraderAssort(itemId, itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLV, true);
        coreMod.CreateTraderAssort(itemId, itemId, "ragfair", itemTraderPrice, "RUB", 1, true);

        this.allowMiccIntoSecureContainers(itemId);
    }

    allowMiccIntoSecureContainers(itemId) {
        const secureContainersIds = [
            "5c093ca986f7740a1867ab12", // Kappa
            "5857a8bc2459772bad15db29", // Gamma
            "59db794186f77448bc595262", // Epsilon
            "5857a8b324597729ab0a0e7d", // Beta
            "544a11ac4bdc2d470e8b456a" // Alpha
        ];
        secureContainersIds.forEach(containerId =>
            DatabaseServer.tables.templates.items[containerId]._props.Grids[0]._props.filters[0].Filter.push(itemId)
        );
    }
}

module.exports.Mod = MICC;
