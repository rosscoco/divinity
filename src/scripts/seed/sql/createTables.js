const createIngredients = `CREATE TABLE 'Ingredients' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'name' VARCHAR(255),
    'displayName' VARCHAR(255),
    'description' VARCHAR(255),
    'icon' VARCHAR(255),
    'category' VARCHAR(255));`;

const createItemStats = `CREATE TABLE 'ItemStats' (
    'id' VARCHAR(255) PRIMARY KEY, 
    'name' VARCHAR(255), 
    'displayName' VARCHAR(255), 
    'parent' VARCHAR(255), 
    'rootTemplate' VARCHAR(255), 
    'value' INTEGER, 
    'weight' INTEGER, 
    'comboCategory' VARCHAR(255),
    'isConsumable' VARCHAR(255),
    'itemGroup' VARCHAR(255),
    'previewIcon' VARCHAR(255),
    'previewTooltip' VARCHAR(255);`;

const createRecipes = `CREATE TABLE 'Recipe' (
'ItemStatId' VARCHAR(255) NOT NULL REFERENCES 'ItemStats' ('id') ON DELETE CASCADE ON UPDATE CASCADE,
'RecipeResultId' INTEGER NOT NULL REFERENCES 'RecipeResults' ('id') ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ('ItemStatId',
'RecipeResultId'))`;

const createRecipeResults = `CREATE TABLE 'RecipeResults' ('id' INTEGER PRIMARY KEY,
    'name' VARCHAR(255))`;

const createRecipeStats = `CREATE TABLE 'RecipeStats' (
    'RecipeResultId' INTEGER NOT NULL REFERENCES 'RecipeResults' ('id') ON DELETE CASCADE ON UPDATE CASCADE,
    'ItemStatId' VARCHAR(255) NOT NULL REFERENCES 'ItemStats' ('id') ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ('RecipeResultId',
    'ItemStatId'))`;

export default { createIngredients,createItemStats,createRecipes,createRecipeStats};
