import { PageLayout } from "@widgets/PageLayout";
import { MockListTable } from "@widgets/Table";

export const Page = () => {
  return (
    <PageLayout activeNav="list">
      <MockListTable />
    </PageLayout>
  );
};
