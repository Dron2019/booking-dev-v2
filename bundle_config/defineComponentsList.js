import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

function generateGitHubLink(username, repository, branch, filePath) {
    return `https://github.com/${username}/${repository}/tree/${branch}/src/components/${filePath}`;
}

function scanDirectory(directoryPath, depth = 0, username, repository, branch, currentPath = '') {
    const items = fs.readdirSync(directoryPath);

    // Ініціюємо рядок для зберігання результатів
    let result = '';

    // Проходимося по кожному елементу у директорії
    items.forEach(item => {
        // Створюємо повний шлях до елементу
        const itemPath = path.join(directoryPath, item);

        // Визначаємо, чи є елемент папкою
        const isDirectory = fs.statSync(itemPath).isDirectory();

        // Оновлюємо поточний шлях для використання у посиланні
        const filePathRelativeToRepo = path.join(currentPath, item);

        // Додаємо поточний елемент до результатів у вигляді Markdown з посиланням на GitHub
        const githubLink = generateGitHubLink(username, repository, branch, filePathRelativeToRepo);
        result += `${'  '.repeat(depth)}- [${isDirectory ? '**' + item + '**' : item}](${githubLink})\n`;

        // Якщо елемент - папка, рекурсивно скануємо її
        if (isDirectory) {
            result += scanDirectory(itemPath, depth + 1, username, repository, branch, filePathRelativeToRepo);
        }
    });

    return result;
}

// Змінні для посилань на GitHub
const username = 'Dron2019';
const repository = 'smarto-booking-online';
const branch = 'main';  // замініть на вашу гілку

// Шлях до папки, яку потрібно сканувати
const folderPath = path.join(__dirname, '../src/components');
const resultFilePath = path.join(__dirname, '../src/components/README.md');

// console.log(folderPath);

// // Викликаємо функцію сканування та виводимо результати

fs.writeFileSync(resultFilePath, scanDirectory(folderPath, 0, username, repository, branch));

// console.log(scanDirectory(folderPath));