import { PageLayout } from "@widgets/PageLayout";
import { SavedMocksWidget } from "@widgets/SavedMocks";

export const Page = () => {
  return (
    <PageLayout activeNav="saved">
      <SavedMocksWidget />
    </PageLayout>
  );
};
