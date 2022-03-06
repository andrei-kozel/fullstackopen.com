import { CoursePartProps } from '../types/coursetypes'
import { assertNever } from '../utils/helpers'

const Part = ({ part }: CoursePartProps) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          {part.name} {part.description} {part.exerciseCount}
        </p>
      )
    case 'groupProject':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          {part.name} {part.description} {part.exerciseCount}{' '}
          {part.exerciseSubmissionLink}
        </p>
      )
    default:
      return assertNever(part)
  }
}

export default Part
