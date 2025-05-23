## Chrome mock extension

## Description

Extension for Chromium-based browsers. This extension allows you to mock API requests by substituting real server responses with test data without the need for third-party proxies or complex network tools.

## Main features

- Mock API requests: replace real server responses with test data.
- Work with `chrome.storage.local`: easily manage mock data inside the browser.
- Support for any resources: AJAX (fetch, XMLHttpRequest) and other requests.
- Easy mocks management: add, edit and delete mocks in the extension interface.
- Light and dark theme.
- Selecting the type of display of saved mocks (list/table).
- Exporting and importing mocks in json format.
- Handy json editor.
- Nice UI.

## How it works

1. The user makes a query, e.g. `fetch("https://jsonplaceholder.typicode.com/users")`.
2. The extension checks the list of mocks - if there is a URL match, it intercepts the request.
3. The server response is replaced with the mocked data.

## Technologies

- React + TypeScript
- react-router
- Ant Design
- Chrome Extensions API
- Vite + yarn
- react-codemirror
- FSD architecture

## Who needs it?

1. Frontend-developers - mock APIs without having to bring up a server.
2. QA-engineers - test interfaces with fixed mock data.

## How to install

### Easy installation

1. Clone the repository.

```bash
git clone --branch build --single-branch https://github.com/pbarovsky/mock_ext_react.git
```

2. Go to `chrome://extensions/`.
3. Enable developer mode.
4. Click the "Load unpacked extension" button.
5. Select the `dist` folder from the `mock_ext_react` folder.
6. Start using!

### Manual project assembly and installation

1. Clone the repository.

```bash
git clone https://github.com/pbarovsky/mock_ext_react.git
```

2. Go to the project directory.

```bash
cd /mock_ext_react
```

3. Perform dependency installation.

```bash
yarn
```

4. Perform project assembly (this will create a `dist` folder).

```bash
yarn build
```

5. Go to `chrome://extensions/`.
6. Enable developer mode.
7. Click the "Load unpacked extension" button.
8. Select the `dist` folder from the `mock_ext_react` folder.
9. Start using!

## Images

<p align="center">
  <img src="./images/1.png" alt="Добавить мок"/>
  <br>Add mock
</p>

<p align="center">
  <img src="./images/2.png" alt="Список моков (table)"/>
  <br>Saved mocks (table variant)
</p>

<p align="center">
  <img src="./images/3.png" alt="Список моков (list)"/>
  <br>Saved mocks (list variant)
</p>

<p align="center">
  <img src="./images/4.png" alt="Настройки темная тема"/>
  <br>Settings
</p>

<p align="center">
  <img src="./images/5.png" alt="Настройки светлая тема"/>
  <br>Settings (light theme)
</p>

<p align="center">
  <img src="./images/6.png" alt="Настройки импорт"/>
  <br>Import mocks as json file
</p>
