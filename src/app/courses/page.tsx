import CoursesCatalog from "@/app/courses/components/CoursesCatalog";
import CourseJourney from "@/components/CourseJourney";

export default function CoursesPage() {
  return (
    <div>
      <div className="bg-white relative w-full overflow-hidden">
        <img src="../img/coursesnode.jpeg" alt="Courses Banner" className="w-full h-auto object-cover animate-glide-in" style={{ height: '250px', filter: 'brightness(0.5)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-white text-4xl font-bold animate-glide">Master Crypto, One Lesson At A Time</h2>
          <h3 className="text-white text-sm font-semibold animate-glide">Interactive courses designed for all levels - from beginner to Web3 expert.</h3>
        </div >
      </div>
      {/* <CourseJourney /> */}
      <CoursesCatalog />
    </div>
  );
}
