import { PageLayout } from "widgets/PageLayout";
import { MockListTable } from "widgets/PageLayout/Table";

export const Page = () => {
  return (
    <PageLayout activeNav="list">
      <MockListTable />
    </PageLayout>
  );
};
