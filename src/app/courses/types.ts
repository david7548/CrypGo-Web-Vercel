export interface CourseModule { //this was for the coursemodule but can be fixed/improved
  id: number;
  title: string;
  type: 'video' | 'text' | 'quiz';
  completed: boolean;
  duration: string;
  content: string;
  progress: number;
}
