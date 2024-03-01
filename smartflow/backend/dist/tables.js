"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importez vos gestionnaires de modules responsables de la connexion à la base de données et de la création des tables
const CardManager_1 = __importDefault(require("./models/CardManager"));
const UserManager_1 = __importDefault(require("./models/UserManager"));
const CategoryManager_1 = __importDefault(require("./models/CategoryManager"));
const RuleManager_1 = __importDefault(require("./models/RuleManager"));
const LanguageManager_1 = __importDefault(require("./models/LanguageManager"));
const ColorManager_1 = __importDefault(require("./models/ColorManager"));
const NotificationManager_1 = __importDefault(require("./models/NotificationManager"));
// Assurez-vous que chaque instance de gestionnaire a une propriété 'tableName'
const managers = [
    new CardManager_1.default(),
    new UserManager_1.default(),
    new CategoryManager_1.default(),
    new RuleManager_1.default(),
    new LanguageManager_1.default(),
    new ColorManager_1.default(),
    new NotificationManager_1.default(),
];
// Créez un objet vide pour contenir les gestionnaires de données pour chaque table
const tables = {};
// Enregistrez chaque gestionnaire dans l'objet tables
managers.forEach((manager) => {
    tables[manager.tableName] = manager;
});
// Utilisez un proxy pour personnaliser les messages d'erreur lors de la tentative d'accès à des tables inexistantes
// Exportez l'instance proxy avec une gestion d'erreur personnalisée
exports.default = new Proxy(tables, {
    get(obj, prop) {
        if (prop in obj)
            return obj[prop];
        throw new ReferenceError(`Table "${prop}" does not exist. Did you register it in ${__filename}?`);
    },
});
