import BottomNavDrawer from "@/components/BottomNavDrawer";

export default function User({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <BottomNavDrawer />
    </div>
  );
}
