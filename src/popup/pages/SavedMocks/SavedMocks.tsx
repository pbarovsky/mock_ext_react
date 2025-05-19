import { PageLayout } from "@widgets/PageLayout";
import { Space } from "antd";
import { useMock } from "@shared/lib/mock/useMock";
import { useState, useEffect } from "react";
import { MockTable } from "@widgets/Table";
import { ViewToggle } from "@shared/ui/ViewToggle";
import { ViewType } from "@shared/lib/types";
import { MockList } from "@widgets/List";

export const Page = () => {
  const { mocks } = useMock();
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

  return (
    <PageLayout activeNav="list">
      {viewType === null ? (
        <p>Loading...</p>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          <ViewToggle onChange={handleViewTypeChange} viewType={viewType} />
          {viewType === "table" ? <MockTable /> : <MockList />}
        </Space>
      )}
    </PageLayout>
  );
};
