import SalonSidebarNavigation from "@/components/SalonSidebarNavigation";
import SalonHeader from "@/components/SalonHeader";
import SalonCustomization from "@/components/SalonCustomization";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100vh] w-[100vw] overflow-x-hidden">
      <div className="flex flex-col h-full flex-1">
        <SalonHeader/>
        <div className="relative flex flex-1">
          <SalonSidebarNavigation />
          <div className="w-5/6 h-full flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
