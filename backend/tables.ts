// Importez vos gestionnaires de modules responsables de la connexion à la base de données et de la création des tables
import CardManager from "./models/CardManager";
import UserManager from "./models/UserManager";
import CategoryManager from "./models/CategoryManager";
import RuleManager from "./models/RuleManager";
import LanguageManager from "./models/LanguageManager";
import ColorManager from "./models/ColorManager";
import NotificationManager from "./models/NotificationManager";

// Définissez une interface pour les classes de gestionnaires
interface ManagerInstance {
  tableName: string;
}

// Assurez-vous que chaque instance de gestionnaire a une propriété 'tableName'
const managers: ManagerInstance[] = [
  new CardManager() as ManagerInstance,
  new UserManager() as ManagerInstance,
  new CategoryManager() as ManagerInstance,
  new RuleManager() as ManagerInstance,
  new LanguageManager() as ManagerInstance,
  new ColorManager() as ManagerInstance,
  new NotificationManager() as ManagerInstance,
];

// Créez un objet vide pour contenir les gestionnaires de données pour chaque table
const tables: { [key: string]: ManagerInstance } = {};

// Enregistrez chaque gestionnaire dans l'objet tables
managers.forEach((manager) => {
  tables[manager.tableName] = manager;
});

// Utilisez un proxy pour personnaliser les messages d'erreur lors de la tentative d'accès à des tables inexistantes

// Exportez l'instance proxy avec une gestion d'erreur personnalisée
export default new Proxy(tables, {
  get(obj, prop: string) {
    if (prop in obj) return obj[prop];

    throw new ReferenceError(
      `Table "${prop}" does not exist. Did you register it in ${__filename}?`
    );
  },
});
