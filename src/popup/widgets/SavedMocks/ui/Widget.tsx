import { useState, useEffect } from "react";
import { Space } from "antd";
import { ViewToggle } from "@shared/ui/ViewToggle";
import { useMockItems } from "@entities/mock/model/useMockItems";
import { ViewType } from "@shared/lib/types";
import { MockTable } from "@widgets/Table";
import { MockList } from "@widgets/List";

export const Widget = () => {
  const mocks = useMockItems();
  const [viewType, setViewType] = useState<ViewType | null>(null);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["viewType"], (result) => {
        setViewType((result.viewType as ViewType) || "list");
      });
    } else {
      setViewType("list");
    }
  }, []);

  const handleViewTypeChange = (value: ViewType) => {
    setViewType(value);
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ viewType: value });
    }
  };

  if (viewType === null) return <p>Loading...</p>;

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <ViewToggle onChange={handleViewTypeChange} viewType={viewType} />
      {viewType === "table" ? (
        <MockTable mocks={mocks} />
      ) : (
        <MockList mocks={mocks} />
      )}
    </Space>
  );
};
