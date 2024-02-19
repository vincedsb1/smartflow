// Définissez l'interface ManagerInstance avec tableName en tant que string | undefined
interface ManagerInstance {
  tableName: string | undefined;
}

// Exemple générique pour une classe de gestionnaire
class CategoryManager {
  tableName: string | undefined; // Assurez-vous que cette propriété est définie dans chaque classe
  // ... autres propriétés et méthodes de la classe ...
}

export default CategoryManager;