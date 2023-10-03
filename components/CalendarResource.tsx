export default function CalendarResource({ resource }: any) {
  return (
    <>
      <div>{resource.resourceId}</div>
      <div>{resource.resourceTitle}</div>
    </>
  );
}
