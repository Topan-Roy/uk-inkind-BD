import WelcomeSection from "@/components/dashboard/WelcomeSection";

export default function HomeworkPage() {
  return (
    <div className="space-y-3 backdrop-blur-sm  p-8 rounded-2xl shadow-sm border border-white/20  ">
         {/* Page Header */}
         <div>
           <h1 className="text-3xl font-serif text-[#000000] font-bold">
            My Homework
           </h1>
         </div>
        <WelcomeSection></WelcomeSection>
       </div>
  );
}
