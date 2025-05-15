import { MockData } from "@types";

// обновление правил
const updateMockRules = (mocks: MockData[]) => {
  const rules: chrome.declarativeNetRequest.Rule[] = mocks
    .filter((m) => m.isActive)
    .map((mock, index) => ({
      id: index + 1, // Уникальный ID для каждого правила
      priority: 1, // Базовый приоритет
      action: {
        type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
        redirect: {
          url: `data:application/json;base64,${btoa(mock.response.trim())}`, // подменный URL с моком
        },
      },
      condition: {
        urlFilter: mock.url, // Запрос должен совпадать с URL мока
        resourceTypes: [
          chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST, // перехват всех AJAX запросов
        ],
      },
    }));

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Array.from({ length: 1000 }, (_, i) => i + 1), // Удаляем ВСЕ возможные правила
    addRules: rules, // Добавляем только актуальные
  });
};

// загрузка моков при старте
chrome.storage.local.get(["mocks"], (result) => {
  updateMockRules(result.mocks || []);
});

// обновление правил при изменении моков
chrome.storage.onChanged.addListener((changes) => {
  if (changes.mocks) updateMockRules(changes.mocks.newValue || []);
});
