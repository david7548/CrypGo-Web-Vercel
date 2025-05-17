import CoursesCatalog from "@/app/courses/components/CoursesCatalog";
import CourseJourney from "@/components/CourseJourney";

export default function CoursesPage() {
  return (
    <div>
      <div className="bg-white relative w-full overflow-hidden">
        <img 
          src="../img/coursesnode.jpeg" 
          alt="Courses Banner" 
          className="w-full h-auto object-cover animate-glide-in" 
          style={{ height: '200px', filter: 'brightness(0.5)' }} 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-white text-2xl md:text-4xl font-bold animate-glide mb-2 md:mb-3">
            Master Crypto, One Lesson At A Time
          </h2>
          <h3 className="text-white text-xs md:text-sm font-semibold animate-glide max-w-[280px] md:max-w-none">
            Interactive courses designed for all levels - from beginner to Web3 expert.
          </h3>
        </div>
      </div>
      {/* <CourseJourney /> */}
      <CoursesCatalog />
    </div>
  );
}
