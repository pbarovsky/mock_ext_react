import { MockBuilder } from "features/AddMock";
import { PageLayout } from "widgets/PageLayout";

export const AddMock = () => {
  return (
    <PageLayout activeNav="add-mock">
      <MockBuilder />
    </PageLayout>
  );
};
