const fs = require('fs');
const glob = require('glob');

const replaceInFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replacements
  content = content.replace(/Clear Aligners/g, 'Invisible Orthodontics');
  content = content.replace(/Clear aligners/g, 'Invisible orthodontics');
  content = content.replace(/clear aligners/g, 'invisible orthodontics');
  
  content = content.replace(/Clear Aligner/g, 'Invisible Orthodontics');
  content = content.replace(/Clear aligner/g, 'Invisible orthodontics');
  content = content.replace(/clear aligner/g, 'invisible orthodontics');

  // Fix up grammar issues that might arise (e.g., "Invisible Orthodontics therapy" -> "Invisible Orthodontics")
  content = content.replace(/Invisible Orthodontics therapy/gi, 'Invisible Orthodontics');
  content = content.replace(/invisible orthodontics therapy/gi, 'invisible orthodontics');
  
  // "Invisible Orthodontics braces" -> "Invisible Orthodontics"
  content = content.replace(/Invisible Orthodontics braces/gi, 'Invisible Orthodontics');
  content = content.replace(/invisible orthodontics braces/gi, 'invisible orthodontics');
  
  // "teeth invisible orthodontics" -> "invisible orthodontics"
  content = content.replace(/teeth invisible orthodontics/gi, 'invisible orthodontics');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
};

const globOptions = { ignore: ['node_modules/**', '.next/**', '.git/**'] };
const files = [
  ...glob.sync('src/**/*.{ts,tsx,js,jsx}', globOptions),
  ...glob.sync('scripts/**/*.mjs', globOptions),
  ...glob.sync('public/**/*.txt', globOptions)
];

files.forEach(replaceInFile);
console.log('Done!');
