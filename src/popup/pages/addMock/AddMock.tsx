import { MockBuilder } from "@features/AddMock";
import { PageLayout } from "@widgets/PageLayout";

export const Page = () => {
  return (
    <PageLayout activeNav="add-mock">
      <MockBuilder />
    </PageLayout>
  );
};
