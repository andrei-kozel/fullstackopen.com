import { CoursePartProps } from '../types/coursetypes'
import Part from './Part'

const Content = ({ part }: CoursePartProps) => {
  return <Part part={part} />
}

export default Content
