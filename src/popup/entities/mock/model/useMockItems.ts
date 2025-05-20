import { useMock } from "@shared/lib/mock/useMock";
import {
  renderName,
  renderURL,
  renderResponse,
  renderSwitch,
  renderActions,
} from "../ui/renderers";
import { MockData } from "@shared/lib/types";

export const useMockItems = () => {
  const { mocks } = useMock();

  const enhancedMocks = mocks.map((mock: MockData) => ({
    ...mock,
    renderName: renderName(mock.name),
    renderURL: renderURL(mock.url),
    renderResponse: renderResponse(mock.response),
    renderSwitch: renderSwitch(mock.isActive, mock),
    renderActions: renderActions(mock),
  }));

  return enhancedMocks;
};
