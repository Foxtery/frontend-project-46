# Gendiff — Configuration Files Difference Generator

Консольное приложение для сравнения двух файлов конфигурации. Определяет добавленные, удалённые и изменённые параметры, включая изменения во вложенных структурах данных.

Учебный проект программы «Фронтенд-разработчик» на Hexlet.

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Foxtery/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Foxtery/frontend-project-46/actions)

### SonarQube tests
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Foxtery_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Foxtery_frontend-project-46)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Foxtery_frontend-project-46&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Foxtery_frontend-project-46)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Foxtery_frontend-project-46&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Foxtery_frontend-project-46)

## Возможности

- Сравнение двух файлов конфигурации.
- Поддержка форматов JSON, YAML и YML.
- Рекурсивное сравнение вложенных объектов.
- Определение добавленных, удалённых, изменённых и неизменённых значений.
- Три формата вывода результата:
  - `stylish` — древовидное представление различий;
  - `plain` — текстовое описание изменений;
  - `json` — структурированный JSON.
- Запуск через командную строку.
- Автоматизированные тесты в каталоге `__tests__`.

## Технологии

- JavaScript
- Node.js
- Commander — CLI-интерфейс
- js-yaml — обработка YAML
- lodash и es-toolkit — вспомогательные операции с данными
- Рекурсивные алгоритмы
- Git

## Установка

Требуются Node.js и npm.

```bash
git clone https://github.com/Foxtery/frontend-project-46.git
cd frontend-project-46
npm ci
```

## Использование

Общий формат команды:

```bash
node bin/gendiff.js [options] <filepath1> <filepath2>
```

Сравнить два JSON-файла:

```bash
node bin/gendiff.js path/to/file1.json path/to/file2.json
```

Получить различия в текстовом формате:

```bash
node bin/gendiff.js --format plain path/to/file1.json path/to/file2.json
```

Получить результат в JSON:

```bash
node bin/gendiff.js --format json path/to/file1.json path/to/file2.json
```

Посмотреть справку:

```bash
node bin/gendiff.js --help
```

## Форматы вывода

### Stylish

Формат по умолчанию. Показывает различия в виде дерева с обозначением добавленных и удалённых значений.

### Plain

Представляет изменения в текстовом виде с полными путями к изменённым свойствам.

### JSON

Возвращает дерево различий в формате JSON для дальнейшей программной обработки.

## Структура проекта

- `bin/` — точка входа CLI.
- `src/parser.js` — чтение структурированных данных JSON/YAML.
- `src/buildDiff.js` — построение дерева различий.
- `src/formatters/` — форматирование результата.
- `src/index.js` — объединение основных этапов сравнения.
- `__tests__/` — автоматизированные проверки.

## Чему я научился

В ходе проекта я практиковался в рекурсивных алгоритмах, работе с вложенными структурами данных, файловой системой Node.js и разработке CLI-приложений.

Отдельное внимание уделил разделению программы на независимые модули: парсинг файлов, вычисление различий и форматирование результата.

## Автор

GitHub: [Foxtery](https://github.com/Foxtery)